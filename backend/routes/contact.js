const express = require('express');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { isMongoConnected } = require('../config/db');

const router = express.Router();

const sendNotificationEmail = async (payload) => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: 'mirzahammadali786@gmail.com',
    replyTo: payload.email,
    subject: `New portfolio inquiry from ${payload.name}`,
    text: `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
  });
};

router.post(
  '/',
  [
    check('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
    check('phone').trim().notEmpty().withMessage('Phone number is required.').matches(/^[0-9+()\-\s]{7,20}$/).withMessage('Please enter a valid phone number.'),
    check('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please enter a valid email address.'),
    check('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    if (req.body.website) {
      return res.status(400).json({
        success: false,
        message: 'Spam detected.',
      });
    }

    try {
      if (!isMongoConnected()) {
        return res.status(503).json({
          success: false,
          message: 'The database is not configured. Add MONGODB_URI to enable contact submissions.',
        });
      }

      const payload = {
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        email: req.body.email.trim(),
        message: req.body.message.trim(),
        website: req.body.website || '',
      };

      const contact = await Contact.create(payload);

      try {
        await sendNotificationEmail(payload);
      } catch (emailError) {
        console.warn('Email notification failed:', emailError.message);
      }

      res.status(201).json({
        success: true,
        message: 'Your message was sent successfully.',
        data: {
          id: contact._id,
          createdAt: contact.createdAt,
        },
      });
    } catch (error) {
      console.error('Contact submission failed:', error);
      res.status(500).json({
        success: false,
        message: 'Unable to submit your message right now. Please try again later.',
      });
    }
  },
);

module.exports = router;
