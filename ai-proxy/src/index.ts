/**
 * AI Proxy Server Entry Point
 *
 * Express server that:
 * 1. Bridges the dajilin.net AI Widget to MiniMax API
 * 2. Manages chat sessions in memory
 * 3. Provides GN-gateway-compatible endpoints (/public/ai/*)
 *
 * Run: npm run dev (development) or npm start (production)
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRouter, { attachMiniMaxClient } from './routes/ai.js';

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed CORS origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://dajilin.net,http://localhost:4321')
  .split(',')
  .map((o) => o.trim());

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  const hasCredentials = Boolean(process.env.MINIMAX_API_KEY);
  res.json({
    status: hasCredentials ? 'ok' : 'missing_credentials',
    timestamp: new Date().toISOString(),
    minimax: hasCredentials ? 'configured' : 'not_configured',
  });
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Attach MiniMax client to all /public/ai/* routes
app.use('/public/ai', attachMiniMaxClient, aiRouter);

// Root redirect
app.get('/', (_req, res) => {
  res.json({
    name: 'dajilin AI Proxy',
    version: '1.0.0',
    endpoints: [
      'POST /public/ai/session  - Create chat session',
      'POST /public/ai/chat    - Send message',
      'GET  /public/ai/recommended-questions',
      'POST /public/ai/handoff - Transfer to human',
      'GET  /health             - Health check',
    ],
  });
});

// ---------------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------------

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ success: false, error: err.message });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

console.log('[DEBUG] MINIMAX_API_KEY:', process.env.MINIMAX_API_KEY?.slice(0, 8));
console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
app.listen(PORT, () => {
  console.log(`\n🚀 AI Proxy running on http://localhost:${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   MiniMax: ${process.env.MINIMAX_API_KEY ? '✅ configured' : '❌ not configured (set MINIMAX_API_KEY & MINIMAX_GROUP_ID)'}`);
  console.log(`\n   Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/public/ai/session`);
  console.log(`   POST http://localhost:${PORT}/public/ai/chat`);
  console.log(`   GET  http://localhost:${PORT}/public/ai/recommended-questions`);
  console.log(`   POST http://localhost:${PORT}/public/ai/handoff\n`);
});
