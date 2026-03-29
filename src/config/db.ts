import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/progress-tracker');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`\n❌ Failed to connect to MongoDB!`);
    console.error(`Make sure you have MongoDB running locally on port 27017,`);
    console.error(`OR paste a MONGODB_URI connection string inside progress-tracker-backend/.env!`);
    console.error(`Error details: ${error.message}\n`);
    process.exit(1);
  }
};

export default connectDB;
