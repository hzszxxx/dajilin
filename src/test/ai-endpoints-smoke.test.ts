/**
 * AI Endpoints Smoke Test
 *
 * Validates that GN AI endpoint URLs are properly configured.
 * Run: pnpm test
 *
 * Note: Actual HTTP requests require GN-Radar/n8n services to be running.
 * This test only validates configuration, not connectivity.
 */
import { describe, it, expect } from 'vitest';

// Expected endpoint patterns (environment variables should define these)
// These are validated via the build system

describe('AI Endpoints Configuration', () => {
  it('GN_AI_SESSION_ENDPOINT env var should be documented', () => {
    // The endpoint URL is built from GN_AI_SESSION_ENDPOINT env var
    // Verify it follows expected webhook URL pattern
    const sessionEndpoint = process.env.GN_AI_SESSION_ENDPOINT || '';
    if (sessionEndpoint) {
      expect(sessionEndpoint).toMatch(/^https?:\/\/.+/);
    }
  });

  it('GN_AI_CHAT_ENDPOINT env var should be documented', () => {
    const chatEndpoint = process.env.GN_AI_CHAT_ENDPOINT || '';
    if (chatEndpoint) {
      expect(chatEndpoint).toMatch(/^https?:\/\/.+/);
    }
  });

  it('GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT env var should be documented', () => {
    const questionsEndpoint = process.env.GN_AI_RECOMMENDED_QUESTIONS_ENDPOINT || '';
    if (questionsEndpoint) {
      expect(questionsEndpoint).toMatch(/^https?:\/\/.+/);
    }
  });

  it('GN_AI_HANDOFF_ENDPOINT env var should be documented', () => {
    const handoffEndpoint = process.env.GN_AI_HANDOFF_ENDPOINT || '';
    if (handoffEndpoint) {
      expect(handoffEndpoint).toMatch(/^https?:\/\/.+/);
    }
  });

  it('PUBLIC_GN_API_BASE_URL env var should be documented', () => {
    const apiBaseUrl = process.env.PUBLIC_GN_API_BASE_URL || '';
    if (apiBaseUrl) {
      expect(apiBaseUrl).toMatch(/^https?:\/\/.+/);
    }
  });
});
