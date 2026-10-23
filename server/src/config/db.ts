import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const DBURI = process.env.DB_CONNECTIONSTRING;

    if (!DBURI) {
      throw new Error('DB connection string no defined');
    }
    await mongoose.connect(DBURI!);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}
