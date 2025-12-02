// src/models/User.ts
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  dob?: string;
  address?: string;
  favorites: string[];
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  async query(text: string, params: any[] = []) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  async createTable() {
    try {
      // Enable the uuid-ossp extension if not already enabled
      await this.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      
      await this.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          avatar TEXT,
          gender VARCHAR(20),
          dob VARCHAR(20),
          address TEXT,
          favorites UUID[] DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Users table created successfully');
      return true;
    } catch (error) {
      console.error('❌ Error creating users table:', error);
      throw error;
    }
  }

  async dropTable() {
    try {
      await this.query('DROP TABLE IF EXISTS users CASCADE');
      console.log('✅ Users table dropped successfully');
      return true;
    } catch (error) {
      console.error('❌ Error dropping users table:', error);
      throw error;
    }
  }

  async createUser(userData: Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'favorites'>) {
    const client = await this.pool.connect();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const result = await client.query(
        `INSERT INTO users (name, email, password, phone)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [userData.name, userData.email, hashedPassword, userData.phone]
      );
      
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findUserByEmail(email: string) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async comparePassword(email: string, candidatePassword: string) {
    const user = await this.findUserByEmail(email);
    if (!user) return false;
    
    return bcrypt.compare(candidatePassword, user.password);
  }

  // Add other methods as needed
}

// Initialize the model and create table
const userModel = new UserModel();
userModel.createTable().catch(console.error);

export default userModel;