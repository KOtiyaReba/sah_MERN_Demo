import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => 
      console.log(`API running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
