/**
 * AI Routes - mimics GN gateway /public/ai/* endpoints
 *
 * POST /public/ai/session  - Create a new chat session
 * POST /public/ai/chat     - Send a message and get AI response
 * GET  /public/ai/recommended-questions - Get suggested questions
 * POST /public/ai/handoff - Hand off to human agent (→ n8n webhook)
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { MiniMaxClient } from '../lib/minimax.js';
import {
  createSession,
  getSession,
  addUserMessage,
  addAssistantMessage,
} from '../lib/session.js';

const router = Router();

// ------------------------------------------------------------------
// Rate limiters
// ------------------------------------------------------------------

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 100, // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: '请求过于频繁，请稍后再试' },
});

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // stricter for chat: 30 per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: '消息发送过于频繁，请稍后重试' },
});

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const SessionCreateSchema = z.object({
  site_id: z.string().optional(),
  page_url: z.string().optional(),
  source: z.string().optional(),
  context: z
    .object({
      module: z.string().optional(),
      locale: z.string().optional(),
      referrer_module: z.string().optional(),
    })
    .optional(),
});

const ChatSendSchema = z.object({
  site_id: z.string().optional(),
  session_id: z.string(),
  page_url: z.string().optional(),
  message: z.string().min(1),
  context: z
    .object({
      module: z.string().optional(),
      locale: z.string().optional(),
      referrer_module: z.string().optional(),
    })
    .optional(),
});

const HandoffSchema = z.object({
  site_id: z.string().optional(),
  session_id: z.string(),
  handoff_type: z.enum(['consultation', 'emergency', 'feedback']).optional(),
  contact: z.object({
    name: z.string(),
    phone_or_wechat: z.string(),
    organization: z.string().optional(),
  }),
  message: z.string(),
  context: z
    .object({
      module: z.string().optional(),
      locale: z.string().optional(),
    })
    .optional(),
});

// ---------------------------------------------------------------------------
// Middleware: require minimax client
// ---------------------------------------------------------------------------

// Attaches minimax client to res.locals (set by app-level middleware)
export function attachMiniMaxClient(
  req: any,
  res: any,
  next: any
) {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID;

  if (!apiKey || !groupId) {
    return res.status(503).json({
      success: false,
      error: 'MiniMax API credentials not configured',
    });
  }

  res.locals.minimax = new MiniMaxClient(apiKey, groupId);
  next();
}

// ---------------------------------------------------------------------------
// POST /public/ai/session
// ---------------------------------------------------------------------------

router.post('/session', chatLimiter, (req, res) => {
  const parsed = SessionCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  const { context } = parsed.data;
  const session = createSession({
    module: context?.module,
    locale: context?.locale,
    pageUrl: context?.referrer_module || parsed.data.page_url,
  });

  const welcomeMessages: Record<string, string> = {
    zh: '你好！我是吉林文旅 AI 导览助手，有什么可以帮你的吗？',
    en: 'Hello! I\'m your Jilin travel guide assistant. How can I help you?',
    ja: '你好！吉林文旅AIガイドアシスタントです 무엇을 도와드릴까요?',
    ko: '안녕하세요！지린文化旅游AI 가이드입니다 무엇을 도와드릴까요?',
  };

  const locale = context?.locale || 'zh';
  const welcome = welcomeMessages[locale] || welcomeMessages.zh;

  res.json({
    success: true,
    data: {
      session_id: session.id,
      welcome_message: welcome,
      suggested_questions: [
        '吉林有哪些好玩的地方？',
        '工业研学怎么安排？',
        '331国道自驾需要注意什么？',
      ],
      knowledge_domains: ['tourism', 'study-tours', 'route331', 'services'],
    },
  });
});

// ---------------------------------------------------------------------------
// POST /public/ai/chat
// ---------------------------------------------------------------------------

router.post('/chat', chatLimiter, (req, res) => {
  const parsed = ChatSendSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  const { session_id, message, context } = parsed.data;
  const locale = context?.locale || 'zh';

  // Get or validate session
  const session = getSession(session_id);
  if (!session) {
    return res.status(404).json({ success: false, error: 'Session not found' });
  }

  // Add user message to history
  addUserMessage(session_id, message);

  const minimax = res.locals.minimax as MiniMaxClient;

  // Build messages for MiniMax (system + history + current)
  const systemPrompt = MiniMaxClient.buildSystemPrompt(locale);
  const historyMessages = session.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  minimax
    .chat({
      model: 'MiniMax-Text-01',
      messages: [
        { role: 'system', content: systemPrompt },
        ...historyMessages,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 512,
    })
    .then((response) => {
      const choice = response.choices[0];
      const answer = choice.message.content;

      // Store assistant response
      addAssistantMessage(session_id, answer);

      // Improved handoff detection - prevents simple prompt injection bypass
      function detectHandoffIntent(message: string): boolean {
        const lower = message.toLowerCase();
        
        // Direct keywords (immediate trigger)
        const directKeywords = [
          '人工', '转人工', '投诉', '紧急', 'help', 'human', 'emergency',
          '找客服', '要投诉', '紧急情况', 'speak to human', 'real person',
        ];
        const hasDirect = directKeywords.some(kw => lower.includes(kw));
        if (hasDirect) return true;
        
        // Combo keywords (requires 2+ signals)
        const combos = [
          ['我要', '人工'], ['找', '客服'], ['投诉', '建议'],
          ['紧急', '帮助'], ['speak', 'human'], ['need', 'person'],
          ['转', '接', '人工'], ['请', '人工', '服务'],
        ];
        const comboScore = combos.filter(([a, b, c]) => {
          if (c) return lower.includes(a) && lower.includes(b) && lower.includes(c);
          return lower.includes(a) && lower.includes(b);
        }).length;
        if (comboScore >= 1) return true;
        
        // Anomaly detection: excessive repetition or length = possible injection
        if (message.length > 2000) {
          // Repeated character patterns (injection signature)
          const hasExcessiveRepetition = /(.)\1{10,}/.test(message);
          // Word count anomaly
          const wordCount = message.split(/\s+/).length;
          if (hasExcessiveRepetition || wordCount > 500) return true;
        }
        
        return false;
      }

      const shouldHandoff = detectHandoffIntent(message);

      res.json({
        success: true,
        data: {
          session_id,
          message_id: uuidv4(),
          answer: {
            message_id: uuidv4(),
            content: answer,
            summary: answer.slice(0, 80) + (answer.length > 80 ? '...' : ''),
            detail: answer,
          },
          suggested_actions: shouldHandoff
            ? [{ type: 'handoff', label: '转人工服务' }]
            : [],
          handoff_suggested: shouldHandoff,
          suggested_follow_ups: [
            '还想了解其他吉林景点',
            '怎么预约门票',
            '下一个问题',
          ],
        },
      });
    })
    .catch((err: Error) => {
      console.error('MiniMax chat error:', err);
      res.status(500).json({
        success: false,
        error: `AI service error: ${err.message}`,
      });
    });
});

// ---------------------------------------------------------------------------
// GET /public/ai/recommended-questions
// ---------------------------------------------------------------------------

router.get('/recommended-questions', apiLimiter, (req, res) => {
  const { module, locale = 'zh' } = req.query;

  // Placeholder: return static questions per module
  // TODO: replace with RAG-based retrieval when knowledge base is ready
  const questionsByModule: Record<string, Record<string, string[]>> = {
    default: {
      zh: [
        '吉林有哪些好玩的地方？',
        '长白山冬季怎么玩？',
        '331国道沿途有哪些驿站？',
        '工业研学有哪些项目？',
        '官方服务怎么预约？',
      ],
      en: [
        'What are the best places to visit in Jilin?',
        'How to visit Changbaishan in winter?',
        'What stations are on Route 331?',
        'What industrial study programs are available?',
        'How to book official services?',
      ],
      ja: [
        '吉林でおすすめの景点はどこですか？',
        '長白山冬の魅力は？',
        '331国道の駅有哪些？',
        '工业研学のプログラムは？',
        '公式サービスの予約方法は？',
      ],
      ko: [
        '지린에서おすすめの 관광지는 어디인가요?',
        '장백산 겨울 여행은 어떻게 하나요?',
        '331국도沿途の驛有哪些？',
        '산업 체험 프로그램은 어떤 것들이 있나요?',
        '공식 서비스 예약 방법은？',
      ],
    },
  };

  const moduleKey = String(module || 'default');
  const localeKey = String(locale);
  const questions = questionsByModule[moduleKey]?.[localeKey]
    || questionsByModule.default.zh;

  res.json({
    success: true,
    data: {
      questions,
      module: moduleKey,
      locale: localeKey,
    },
  });
});

// ---------------------------------------------------------------------------
// POST /public/ai/handoff
// ---------------------------------------------------------------------------

router.post('/handoff', apiLimiter, async (req, res) => {
  const parsed = HandoffSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  const { session_id, contact, message, context } = parsed.data;

  const handoffUrl = process.env.PUBLIC_GN_N8N_AI_HANDOFF_WEBHOOK_URL;
  if (!handoffUrl) {
    return res.status(503).json({
      success: false,
      error: 'Handoff webhook not configured',
    });
  }

  try {
    const webhookResponse = await fetch(handoffUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id,
        handoff_type: parsed.data.handoff_type || 'consultation',
        contact: {
          name: contact.name,
          phone_or_wechat: contact.phone_or_wechat,
          organization: contact.organization,
        },
        message,
        context: context || {},
        source: 'ai-widget',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error(`n8n webhook returned ${webhookResponse.status}`);
    }

    res.json({
      success: true,
      data: {
        handoff_id: `hd-${Date.now()}`,
        estimated_response_time: '2小时内',
      },
    });
  } catch (err: any) {
    console.error('Handoff error:', err);
    res.status(500).json({
      success: false,
      error: `Handoff failed: ${err.message}`,
    });
  }
});

export default router;
