/**
 * AI Chat Client for OpenClaw Integration
 *
 * Phase 2: Real AI agent integration via OpenClaw for natural language
 * understanding and controlled skill calls.
 */

import { createOpenClawGatewayClient } from '@gn/openclaw-client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface ChatSession {
  sessionId: string;
  createdAt: number;
  messages: ChatMessage[];
  context: ChatContext;
}

export interface ChatContext {
  siteId: string;
  pageUrl: string;
  module: string;
  locale: string;
  referrerModule?: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  context: ChatContext;
}

export interface ChatResponse {
  sessionId: string;
  message: ChatMessage;
  suggestedActions: SuggestedAction[];
  handoffSuggested: boolean;
  nextKnowledgeDomain?: string;
}

export interface SuggestedAction {
  type: 'open_page' | 'handoff' | 'suggested_question';
  label: string;
  target?: string;
  question_id?: string;
}

export interface HandoffRequest {
  sessionId: string;
  handoffType: 'consultation' | 'emergency' | 'feedback';
  contact: {
    name: string;
    phoneOrWechat: string;
    organization?: string;
  };
  message: string;
  context: ChatContext;
}

export interface HandoffResponse {
  success: boolean;
  handoffId?: string;
  estimatedResponseTime?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Skill Names for AI Chat
// ---------------------------------------------------------------------------

export const AI_CHAT_SKILL_NAMES = [
  'ai.chat.start',
  'ai.chat.send',
  'ai.chat.end',
  'ai.chat.handoff',
  'ai.chat.history',
] as const;

export type AiChatSkillName = (typeof AI_CHAT_SKILL_NAMES)[number];

// ---------------------------------------------------------------------------
// Request/Response Types for AI Chat Skills
// ---------------------------------------------------------------------------

export interface AiChatStartRequest {
  site_id: string;
  page_url: string;
  source: string;
  context?: {
    module?: string;
    locale?: string;
    referrer_module?: string;
  };
}

export interface AiChatStartResponse {
  session_id: string;
  welcome_message: string;
  suggested_questions: string[];
  knowledge_domains: string[];
}

export interface AiChatSendRequest {
  site_id: string;
  session_id: string;
  page_url: string;
  message: string;
  context?: {
    module?: string;
    locale?: string;
    referrer_module?: string;
  };
}

export interface AiChatSendResponse {
  session_id: string;
  message_id: string;
  content: string;
  summary: string;
  detail?: string;
  suggested_actions: SuggestedAction[];
  handoff_suggested: boolean;
  next_knowledge_domain?: string;
  suggested_follow_ups?: string[];
}

export interface AiChatEndRequest {
  site_id: string;
  session_id: string;
}

export interface AiChatEndResponse {
  session_id: string;
  message_count: number;
  duration_seconds: number;
}

export interface AiChatHandoffRequest {
  site_id: string;
  session_id: string;
  handoff_type: 'consultation' | 'emergency' | 'feedback';
  contact: {
    name: string;
    phone_or_wechat: string;
    organization?: string;
  };
  message: string;
  context?: {
    module?: string;
    locale?: string;
  };
}

export interface AiChatHandoffResponse {
  success: boolean;
  handoff_id?: string;
  estimated_response_time?: string;
  error?: string;
}

export interface AiChatHistoryRequest {
  site_id: string;
  session_id: string;
  limit?: number;
  offset?: number;
}

export interface AiChatHistoryResponse {
  session_id: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  total_count: number;
}

// ---------------------------------------------------------------------------
// AI Chat Client Factory
// ---------------------------------------------------------------------------

export interface OpenClawAiClientOptions {
  baseUrl: string;
  siteId: string;
  userAgent?: string;
}

/**
 * Create an OpenClaw AI Chat client with session management.
 *
 * This client wraps the OpenClaw gateway client and provides
 * a higher-level API for AI chat sessions.
 */
export const createOpenClawAiClient = (options: OpenClawAiClientOptions) => {
  const gateway = createOpenClawGatewayClient({
    baseUrl: options.baseUrl,
    siteId: options.siteId,
    userAgent: options.userAgent || 'OpenClaw-AI-Chat-Client/1.0',
  });

  // Local session storage
  const sessions = new Map<string, ChatSession>();

  return {
    /**
     * Start a new AI chat session.
     */
    async startSession(
      pageUrl: string,
      source: string = 'web',
      context?: AiChatStartRequest['context']
    ): Promise<ChatSession> {
      const response = await gateway.callSkill<
        AiChatStartRequest,
        AiChatStartResponse
      >('ai.chat.start' as any, {
        page_url: pageUrl,
        source,
        context,
      } as any);

      if (!response.success) {
        throw new Error(`Failed to start session: ${response.error}`);
      }

      const session: ChatSession = {
        sessionId: response.data.session_id,
        createdAt: Date.now(),
        messages: [
          {
            id: `system-welcome-${Date.now()}`,
            role: 'assistant',
            content: response.data.welcome_message,
            timestamp: Date.now(),
          },
        ],
        context: {
          siteId: options.siteId,
          pageUrl,
          module: context?.module || '',
          locale: context?.locale || 'zh',
        },
      };

      sessions.set(session.sessionId, session);
      return session;
    },

    /**
     * Send a message in an existing session.
     */
    async sendMessage(
      sessionIdOrSession: string | ChatSession,
      message: string,
      context?: AiChatSendRequest['context']
    ): Promise<ChatResponse> {
      const sessionId =
        typeof sessionIdOrSession === 'string'
          ? sessionIdOrSession
          : sessionIdOrSession.sessionId;

      const response = await gateway.callSkill<
        AiChatSendRequest,
        AiChatSendResponse
      >('ai.chat.send' as any, {
        session_id: sessionId,
        page_url:
          typeof sessionIdOrSession === 'string'
            ? ''
            : sessionIdOrSession.context.pageUrl,
        message,
        context,
      } as any);

      if (!response.success) {
        throw new Error(`Failed to send message: ${response.error}`);
      }

      const data = response.data;
      const chatMessage: ChatMessage = {
        id: data.message_id,
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
        metadata: {
          summary: data.summary,
          detail: data.detail,
        },
      };

      // Update local session if we have it
      const session = sessions.get(sessionId);
      if (session) {
        session.messages.push(chatMessage);
      }

      return {
        sessionId: data.session_id,
        message: chatMessage,
        suggestedActions: data.suggested_actions.map((action) => ({
          type: action.type as 'open_page' | 'handoff' | 'suggested_question',
          label: action.label,
          target: (action as any).target,
          question_id: (action as any).question_id,
        })),
        handoffSuggested: data.handoff_suggested,
        nextKnowledgeDomain: data.next_knowledge_domain,
      };
    },

    /**
     * End an AI chat session.
     */
    async endSession(sessionId: string): Promise<AiChatEndResponse> {
      const response = await gateway.callSkill<
        AiChatEndRequest,
        AiChatEndResponse
      >('ai.chat.end' as any, {
        session_id: sessionId,
      } as any);

      if (!response.success) {
        throw new Error(`Failed to end session: ${response.error}`);
      }

      sessions.delete(sessionId);
      return response.data;
    },

    /**
     * Request human handoff.
     */
    async requestHandoff(
      sessionId: string,
      handoff: Omit<HandoffRequest, 'sessionId' | 'context'>
    ): Promise<HandoffResponse> {
      const session = sessions.get(sessionId);

      const response = await gateway.callSkill<
        AiChatHandoffRequest,
        AiChatHandoffResponse
      >('ai.chat.handoff' as any, {
        session_id: sessionId,
        handoff_type: handoff.handoffType,
        contact: handoff.contact,
        message: handoff.message,
        context: session?.context,
      } as any);

      if (!response.success) {
        return {
          success: false,
          error: response.error,
        };
      }

      return {
        success: response.data.success,
        handoffId: response.data.handoff_id,
        estimatedResponseTime: response.data.estimated_response_time,
      };
    },

    /**
     * Get chat history for a session.
     */
    async getHistory(
      sessionId: string,
      limit: number = 50,
      offset: number = 0
    ): Promise<AiChatHistoryResponse> {
      const response = await gateway.callSkill<
        AiChatHistoryRequest,
        AiChatHistoryResponse
      >('ai.chat.history' as any, {
        session_id: sessionId,
        limit,
        offset,
      } as any);

      if (!response.success) {
        throw new Error(`Failed to get history: ${response.error}`);
      }

      return response.data;
    },

    /**
     * Get or restore a session from local storage.
     */
    restoreSession(storageKey: string): ChatSession | null {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return null;

      try {
        const session = JSON.parse(stored) as ChatSession;
        sessions.set(session.sessionId, session);
        return session;
      } catch {
        return null;
      }
    },

    /**
     * Save session to local storage.
     */
    saveSession(storageKey: string, session: ChatSession): void {
      localStorage.setItem(storageKey, JSON.stringify(session));
    },

    /**
     * Clear session from local storage.
     */
    clearSession(storageKey: string): void {
      localStorage.removeItem(storageKey);
    },
  };
};

// ---------------------------------------------------------------------------
// Default instance factory
// ---------------------------------------------------------------------------

let defaultClient: ReturnType<typeof createOpenClawAiClient> | null = null;

export const getOpenClawAiClient = (
  baseUrl?: string,
  siteId?: string
): ReturnType<typeof createOpenClawAiClient> => {
  if (!defaultClient) {
    const base = baseUrl || process.env.PUBLIC_GN_API_BASE_URL || '';
    const site = siteId || 'dajilin';
    defaultClient = createOpenClawAiClient({
      baseUrl: base,
      siteId: site,
    });
  }
  return defaultClient;
};
