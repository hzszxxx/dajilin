/**
 * GN Radar Client for dajilin
 *
 * This module provides Radar API integration for dajilin using the
 * shared @gn/site-adapters/radar-client.
 */

import type { GnGatewayContext } from '@gn/gateway-helpers';
import {
  fetchRadarDashboard,
  fetchRadarJob,
  fetchRadarJobs,
  fetchRadarQuestions,
  type RadarApiSuccess,
  type RadarDashboardData,
  type RadarMonitorJob,
} from '@gn/site-adapters/radar-client';

export type { RadarApiSuccess, RadarDashboardData, RadarMonitorJob };

/**
 * Create a GN gateway context for dajilin.
 */
export const createRadarContext = (overrides?: Partial<GnGatewayContext>): GnGatewayContext => ({
  source: 'site',
  siteId: 'dajilin',
  requestedBy: 'dajilin-website',
  ...overrides,
});

/**
 * Get GEO dashboard data for dajilin.net.
 */
export const getDajilinDashboard = (context?: GnGatewayContext) =>
  fetchRadarDashboard('dajilin.net', context || createRadarContext());

/**
 * Get GEO dashboard data for a custom domain.
 */
export const getDashboardForDomain = (domain: string, context?: GnGatewayContext) =>
  fetchRadarDashboard(domain, context || createRadarContext());

/**
 * Get a specific radar job status.
 */
export const getDajilinJob = (jobId: number, context?: GnGatewayContext) =>
  fetchRadarJob(jobId, context || createRadarContext());

/**
 * Get all radar jobs for a domain.
 */
export const getDajilinJobs = (domain: string, context?: GnGatewayContext) =>
  fetchRadarJobs(domain, context || createRadarContext());

/**
 * Get radar questions for a specific industry and language.
 */
export const getDajilinQuestions = (
  industry: string = 'tourism',
  language: string = 'zh-CN',
  limit: number = 100,
  context?: GnGatewayContext,
) =>
  fetchRadarQuestions(industry, language, limit, context || createRadarContext());
