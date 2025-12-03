import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userModel from './models/User.js';
import authRoutes from './routes/authRoutes.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await connectDB();
    
    try {
      // Drop and recreate tables (remove this in production after initial setup)
      await userModel.dropTable().catch(console.error);
      await userModel.createTable();
      console.log('✅ Database tables initialized');
    } catch (error) {
      console.error('❌ Database initialization error:', error);
      process.exit(1);
    }

    // Routes
    app.get('/', (_req: Request, res: Response) => {
      res.send('Property Rental API is running');
    });

    // Auth
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();