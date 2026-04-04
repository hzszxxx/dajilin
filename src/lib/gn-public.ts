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
  const apiBaseUrl = process.env.PUBLIC_GN_API_BASE_URL || '';

  return {
    apiBaseUrl,
    aiSession: buildN8nWebhookUrl('GN_AI_SESSION_ENDPOINT', '/public/ai/session'),
    aiChat: buildN8nWebhookUrl('GN_AI_CHAT_ENDPOINT', '/public/ai/chat'),
    aiRecommendedQuestions: buildN8nWebhookUrl('GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT', '/public/ai/recommended-questions'),
    aiHandoff: buildN8nWebhookUrl('GN_AI_HANDOFF_ENDPOINT', '/public/ai/handoff'),
  };
};
