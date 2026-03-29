import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import batchRoutes from './routes/batchRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/batches', batchRoutes);

// --- STATIC FRONTEND DEPLOYMENT ---
// Serve the compiled React UI out of the backend's static pipeline.
app.use(express.static(path.join(__dirname, '../public')));

// Any uncaught wildcard routing elegantly passes to React Router Dom natively.
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
// ----------------------------------

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = 5005;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
