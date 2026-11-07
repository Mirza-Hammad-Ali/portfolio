import { useState } from 'react';
import { LoaderCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const initialState = {
  name: '',
  phone: '',
  email: '',
  message: '',
  website: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,20}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.';
    else if (!phonePattern.test(formData.phone.trim())) nextErrors.phone = 'Enter a valid phone number.';
    if (!formData.email.trim()) nextErrors.email = 'Email address is required.';
    else if (!emailPattern.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!formData.message.trim()) nextErrors.message = 'Message is required.';
    else if (formData.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverMessage.text) setServerMessage({ type: '', text: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerMessage({ type: '', text: '' });

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok || payload.success === false) {
        throw new Error(payload.message || 'Something went wrong.');
      }

      setServerMessage({ type: 'success', text: payload.message || 'Message sent successfully.' });
      setFormData(initialState);
      setErrors({});
    } catch (error) {
      setServerMessage({ type: 'error', text: error.message || 'Unable to send your message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <div className="field-wrap">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <small className="error-text">{errors.name}</small> : null}
        </div>

        <div className="field-wrap">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <small className="error-text">{errors.phone}</small> : null}
        </div>
      </div>

      <div className="field-wrap">
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
        {errors.email ? <small className="error-text">{errors.email}</small> : null}
      </div>

      <div className="field-wrap">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <small className="error-text">{errors.message}</small> : null}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>

      {serverMessage.text ? (
        <div className={`status-box ${serverMessage.type}`}>
          {serverMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{serverMessage.text}</span>
        </div>
      ) : null}

      <button type="submit" className="primary-button form-submit" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
