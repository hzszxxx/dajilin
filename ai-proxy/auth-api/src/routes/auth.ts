import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { readFile, writeFile, getDataPath } from '../lib/fileStore.js';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production';
const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

// Rate limiters (10 requests per 5 minutes per IP)
const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many registration attempts, please try again in 5 minutes' },
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts, please try again in 5 minutes' },
});

// Schema
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Types
interface User {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  createdAt: string;
}

interface UserResponse {
  id: string;
  email: string;
  name?: string;
}

interface TokenPayload {
  userId: string;
}

// ------------------------------------------------------------------
// Auth middleware
// ------------------------------------------------------------------

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    (req as any).userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

// ------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------

export const authRouter = express.Router();

// POST /auth/register
authRouter.post('/register', async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.errors[0].message });
  }

  const { email, password, name } = parsed.data;

  const users: User[] = JSON.parse(await readFile(getDataPath('users.json')));

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ success: false, error: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeFile(getDataPath('users.json'), JSON.stringify(users, null, 2));

  const { passwordHash: _, ...userResponse } = newUser;
  return res.status(201).json({ success: true, user: userResponse });
});

// POST /auth/login
authRouter.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid request' });
  }

  const { email, password } = parsed.data;

  const users: User[] = JSON.parse(await readFile(getDataPath('users.json')));
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  const { passwordHash: _, ...userResponse } = user;
  return res.json({ success: true, user: userResponse });
});

// GET /auth/me
authRouter.get('/me', requireAuth, async (req, res) => {
  const users: User[] = JSON.parse(await readFile(getDataPath('users.json')));
  const user = users.find((u) => u.id === (req as any).userId);

  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  const { passwordHash: _, ...userResponse } = user;
  return res.json({ success: true, user: userResponse });
});

// POST /auth/logout
authRouter.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  return res.json({ success: true });
});
