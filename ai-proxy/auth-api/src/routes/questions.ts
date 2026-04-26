import express from 'express';
import { readFile, writeFile, getDataPath } from '../lib/fileStore.js';
import { requireAuth } from './auth.js';

interface QuestionRecord {
  id: string;
  userId: string;
  question: string;
  timestamp: string;
}

// GET /auth/questions/top - Top 5 most asked questions (public)
export const questionsRouter = express.Router();

questionsRouter.get('/top', async (_req, res) => {
  const questions: QuestionRecord[] = JSON.parse(await readFile(getDataPath('questions.json')));

  // Count occurrences of each question
  const countMap = new Map<string, number>();
  for (const q of questions) {
    const normalized = q.question.trim();
    countMap.set(normalized, (countMap.get(normalized) || 0) + 1);
  }

  // Sort by count descending, take top 5
  const top = Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([question, count]) => ({ question, count }));

  return res.json({ success: true, questions: top });
});

// GET /auth/questions/mine - User's question history (login required)
questionsRouter.get('/mine', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const questions: QuestionRecord[] = JSON.parse(await readFile(getDataPath('questions.json')));

  // Filter and sort by timestamp descending (newest first)
  const mine = questions
    .filter((q) => q.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .map(({ question, timestamp }) => ({ question, timestamp }));

  return res.json({ success: true, questions: mine });
});

// POST /auth/question - Record a question (login required)
questionsRouter.post('/', requireAuth, async (req, res) => {
  const { question } = req.body as { question?: string };

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Question is required' });
  }

  const userId = (req as any).userId;
  const questions: QuestionRecord[] = JSON.parse(await readFile(getDataPath('questions.json')));

  const newRecord: QuestionRecord = {
    id: crypto.randomUUID(),
    userId,
    question: question.trim(),
    timestamp: new Date().toISOString(),
  };

  questions.push(newRecord);
  await writeFile(getDataPath('questions.json'), JSON.stringify(questions, null, 2));

  // Count total questions for this user
  const userQuestionCount = questions.filter((q) => q.userId === userId).length;

  return res.json({ success: true, questionCount: userQuestionCount });
});
