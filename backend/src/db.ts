import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/privacy-broker');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
