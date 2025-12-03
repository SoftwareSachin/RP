// src/config/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse the Neon connection URL
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Zszhpq1oLul5@ep-summer-waterfall-adtkjudj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Test the connection
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected');
    client.release();
    return pool;
  } catch (error: any) {
    console.error('❌ DB Error:', error.message);
    process.exit(1);
  }
};