
import express from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { db } from '../db';
import { Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2)
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [data.name, data.email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    
    const user = await db.query('SELECT * FROM users WHERE email = $1', [data.email]);
    
    if (!user.rows[0]) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(data.password, user.rows[0].password);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      config.jwtSecret,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.rows[0].id, email: user.rows[0].email, name: user.rows[0].name } });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await db.query('SELECT id, name, email FROM users WHERE id = $1', [(req as AuthRequest).user?.id]);
    res.json(user.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get profile', error });
  }
});

export default router;
