import mongoose from 'mongoose';

let connecting;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!connecting) {
    connecting = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
      connecting = null;
      throw err;
    });
  }
  await connecting;
  console.log('MongoDB connected');
}