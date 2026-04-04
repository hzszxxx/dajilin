/**
 * GN (GEO-N8N-OpenClaw) Integration Module for dajilin
 *
 * This module provides access to all GN-related functionality:
 * - Radar client for GEO monitoring
 * - Workflows client for n8n automation
 * - Skill contract for OpenClaw integration
 * - Configuration helpers
 */

// Configuration
export {
  getDajilinGnConfig,
  getGnApiBaseUrl,
  getRadarBaseUrl,
  getN8nWebhookBaseUrl,
  getSignalScoutBaseUrl,
  buildGnApiUrl,
  buildN8nWebhookUrl,
  buildRadarUrl,
  getServiceToken,
  SIGNAL_SCOUT_WATCH_TOPICS,
  type SignalScoutWatchTopic,
  type DajilinGnConfig,
} from './config';

// Radar client
export {
  getDajilinDashboard,
  getDajilinJob,
  getDajilinJobs,
  getDajilinQuestions,
  getDashboardForDomain,
  createRadarContext,
  type RadarApiSuccess,
  type RadarDashboardData,
  type RadarMonitorJob,
} from './radar-client';

// Workflows client
export {
  triggerDajilinMonitor,
  triggerDajilinFailureNotify,
  triggerDajilinJobStatusPoller,
  triggerDajilinSiteOnboarding,
  triggerDajilinSiteAssessment,
  triggerDajilinDailySummary,
  createWorkflowContext,
  type MonitorWorkflowRequest,
  type FailureNotifyRequest,
  type JobStatusPollerRequest,
  type SiteOnboardingRequest,
  type SiteAssessmentRequest,
  type DailySummaryRequest,
} from './workflows-client';

// Re-export skill contract from @gn/skill-contract
export {
  SKILL_NAMES,
  isSkillName,
  validateSkillRequest,
  validateSkillResponse,
  type SkillName,
} from '@gn/skill-contract';
