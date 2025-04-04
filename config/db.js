const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    
    // Évite les logs bruyants pendant les tests
    if (process.env.NODE_ENV !== 'test') {
      console.log('✅ MongoDB connected');
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('❌ DB Connection Error:', err.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
