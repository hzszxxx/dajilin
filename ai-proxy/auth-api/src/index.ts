/**
 * Auth API - User authentication & question tracking for dajilin.net
 *
 * Endpoints:
 *   POST /auth/register   - Register new user
 *   POST /auth/login      - Login & set JWT cookie
 *   GET  /auth/me         - Get current user
 *   POST /auth/logout     - Clear JWT cookie
 *   POST /auth/question   - Record a question (login required)
 *   GET  /auth/questions/top    - Top 5 most asked questions (public)
 *   GET  /auth/questions/mine  - User's question history (login required)
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';
import { questionsRouter } from './routes/questions.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://dajilin.net,http://localhost:4321')
  .split(',')
  .map((o) => o.trim());

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/auth', authRouter);
app.use('/auth', questionsRouter);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🔐 Auth API running on http://localhost:${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/auth/register`);
  console.log(`   POST http://localhost:${PORT}/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/auth/me`);
  console.log(`   POST http://localhost:${PORT}/auth/logout`);
  console.log(`   POST http://localhost:${PORT}/auth/question`);
  console.log(`   GET  http://localhost:${PORT}/auth/questions/top`);
  console.log(`   GET  http://localhost:${PORT}/auth/questions/mine\n`);
});
