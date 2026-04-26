/**
 * In-memory session management for AI chat.
 * Each session maintains conversation history for multi-turn dialogue.
 */

import { v4 as uuidv4 } from 'uuid';
import type { MiniMaxMessage } from './minimax.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Session {
  id: string;
  createdAt: number;
  messages: MiniMaxMessage[];
  context: {
    module?: string;
    locale?: string;
    pageUrl?: string;
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

const sessions = new Map<string, Session>();

// Simple cleanup: remove sessions older than 24h
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of Array.from(sessions)) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}, 60 * 60 * 1000); // run every hour

// ---------------------------------------------------------------------------
// Operations
// ---------------------------------------------------------------------------

export function createSession(context?: Session['context']): Session {
  const session: Session = {
    id: uuidv4(),
    createdAt: Date.now(),
    messages: [],
    context: context || {},
  };
  sessions.set(session.id, session);
  return session;
}

export function getSession(id: string): Session | null {
  return sessions.get(id) ?? null;
}

export function addUserMessage(
  sessionId: string,
  content: string
): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  session.messages.push({ role: 'user', content });
  return session;
}

export function addAssistantMessage(
  sessionId: string,
  content: string
): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  session.messages.push({ role: 'assistant', content });
  return session;
}

export function deleteSession(id: string): boolean {
  return sessions.delete(id);
}
