import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
  constructor(private pool: Pool) {}

  private async query(text: string, params: any[] = []) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  async createTable() {
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
      
      -- Create extension if not exists for UUID generation
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  async createUser(userData: Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'favorites'>) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const result = await this.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [userData.name, userData.email, hashedPassword, userData.phone]
    );
    
    return result.rows[0];
  }

  async findUserByEmail(email: string) {
    const result = await this.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async comparePassword(email: string, candidatePassword: string) {
    const user = await this.findUserByEmail(email);
    if (!user) return false;
    
    return bcrypt.compare(candidatePassword, user.password);
  }

  async updateUserProfile(
    id: string,
    updates: Partial<Pick<IUser, 'name' | 'phone' | 'gender' | 'dob' | 'address' | 'avatar'>>
  ) {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    const allowedFields: (keyof IUser)[] = ['name', 'phone', 'gender', 'dob', 'address', 'avatar'];

    for (const key of allowedFields) {
      const value = (updates as any)[key];
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      const existing = await this.query('SELECT * FROM users WHERE id = $1', [id]);
      return existing.rows[0] || null;
    }

    values.push(id);

    const result = await this.query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }
}
