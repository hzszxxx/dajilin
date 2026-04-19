/**
 * @deprecated Use @gn/site-config for site configuration.
 * This module provides AI-specific endpoints that build on top of @gn/site-config.
 */
import { getSiteConfig, buildN8nWebhookUrl } from '@gn/site-config';

export interface DajilinPublicEndpoints {
  apiBaseUrl: string;
  aiSession: string;
  aiChat: string;
  aiRecommendedQuestions: string;
  aiHandoff: string;
}

export const getGNPublicEndpoints = (): DajilinPublicEndpoints => {
  const { siteId } = getSiteConfig();
  const apiBaseUrl = (import.meta as any).env?.PUBLIC_GN_API_BASE_URL || (typeof process !== 'undefined' ? process.env.PUBLIC_GN_API_BASE_URL : '') || '';

  return {
    apiBaseUrl,
    aiSession: (import.meta as any).env?.PUBLIC_GN_AI_SESSION_ENDPOINT || buildN8nWebhookUrl('PUBLIC_GN_AI_SESSION_ENDPOINT', '/public/ai/session'),
    aiChat: (import.meta as any).env?.PUBLIC_GN_AI_CHAT_ENDPOINT || buildN8nWebhookUrl('PUBLIC_GN_AI_CHAT_ENDPOINT', '/public/ai/chat'),
    aiRecommendedQuestions: (import.meta as any).env?.PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT || buildN8nWebhookUrl('PUBLIC_GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT', '/public/ai/recommended-questions'),
    aiHandoff: (import.meta as any).env?.PUBLIC_GN_AI_HANDOFF_ENDPOINT || buildN8nWebhookUrl('PUBLIC_GN_AI_HANDOFF_ENDPOINT', '/public/ai/handoff'),
  };
};
