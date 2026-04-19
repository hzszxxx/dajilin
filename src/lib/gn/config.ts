/**
 * GN Configuration for dajilin site
 *
 * This module provides site-specific GN (GEO-N8N-OpenClaw) configuration.
 * Use this instead of hardcoding site IDs or configuration values.
 */

import { getSiteConfig as getBaseSiteConfig } from '@gn/site-config';

export interface DajilinGnConfig {
  siteId: string;
  domain: string;
  industry: string;
  region: string;
  language: string;
  apiBaseUrl: string;
}

const getEnv = (name: string, fallback: string): string => {
  // Support both Node process.env and Vite import.meta.env
  const env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;
  const viteEnv = (import.meta as any).env as Record<string, string | undefined>;
  return env[name] || viteEnv[name] || fallback;
};

const getRequiredEnv = (name: string): string => {
  const value = getEnv(name, '');
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

/**
 * Get the GN API base URL for public endpoints.
 */
export const getGnApiBaseUrl = (): string =>
  getEnv('PUBLIC_GN_API_BASE_URL', 'https://api.renban.xyz');

/**
 * Get the GN-Radar base URL.
 */
export const getRadarBaseUrl = (): string =>
  getEnv('GN_RADAR_BASE_URL', 'https://radar.example.com');

/**
 * Get the n8n webhook base URL.
 */
export const getN8nWebhookBaseUrl = (): string =>
  getEnv('GN_N8N_WEBHOOK_BASE_URL', 'https://n.n8n.wang');

/**
 * Get the Signal Scout base URL.
 */
export const getSignalScoutBaseUrl = (): string =>
  getEnv('GN_SIGNAL_SCOUT_BASE_URL', 'https://signals.example.com');

/**
 * Get dajilin-specific GN configuration.
 */
export const getDajilinGnConfig = (): DajilinGnConfig => {
  const baseConfig = getBaseSiteConfig();

  return {
    siteId: baseConfig.siteId || 'dajilin',
    domain: getEnv('SITE_URL', 'https://dajilin.net').replace(/https?:\/\//, ''),
    industry: baseConfig.defaultIndustry || 'tourism',
    region: baseConfig.defaultRegion || 'CN',
    language: baseConfig.defaultLanguage || 'zh-CN',
    apiBaseUrl: getGnApiBaseUrl(),
  };
};

/**
 * Build a URL for a specific GN API public endpoint.
 */
export const buildGnApiUrl = (path: string): string => {
  const baseUrl = getGnApiBaseUrl().replace(/\/$/, '');
  return `${baseUrl}${path}`;
};

/**
 * Build a URL for a specific n8n webhook.
 */
export const buildN8nWebhookUrl = (explicitUrlName: string, basePath: string): string => {
  const explicitUrl = getEnv(explicitUrlName, '');
  if (explicitUrl && explicitUrl.trim().length > 0) {
    return explicitUrl.replace(/\/$/, '');
  }
  return `${getN8nWebhookBaseUrl()}${basePath}`;
};

/**
 * Build a URL for a specific Radar endpoint.
 */
export const buildRadarUrl = (path: string): string => {
  const baseUrl = getRadarBaseUrl().replace(/\/$/, '');
  return `${baseUrl}${path}`;
};

/**
 * Get the required service token for internal service communication.
 */
export const getServiceToken = (): string =>
  getRequiredEnv('GN_N8N_SERVICE_TOKEN');

/**
 * Default watch topics for Signal Scout.
 * These are the topics dajilin should monitor for content and trend insights.
 */
export const SIGNAL_SCOUT_WATCH_TOPICS = [
  // Core tourism topics
  '吉林旅游',
  '长春旅游',
  '长白山',
  '延边旅游',

  // Seasonal topics
  '吉林冰雪',
  '吉林避暑',

  // Route 331 related
  '331国道',
  '吉林331自驾',

  // Industrial study tours
  '长春工业研学',
  '一汽红旗研学',
  '中车长客参访',

  // Broader topics
  '吉林文旅',
  '东北旅游',
  '长白山攻略',
] as const;

export type SignalScoutWatchTopic = typeof SIGNAL_SCOUT_WATCH_TOPICS[number];
