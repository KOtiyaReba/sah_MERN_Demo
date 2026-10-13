import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

// Make sure the database is connected before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed:', err.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/api/tasks', taskRoutes);

export default app;

// Run a normal server only on your own computer, not on Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
    .catch((err) => {
      console.error('Database connection failed:', err.message);
      process.exit(1);
    });
}