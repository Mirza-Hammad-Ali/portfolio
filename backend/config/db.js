const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.trim() === '') {
    console.warn('MONGODB_URI is not configured. Add a MongoDB connection string to enable contact saving.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return false;
  }
};

const isMongoConnected = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isMongoConnected };
