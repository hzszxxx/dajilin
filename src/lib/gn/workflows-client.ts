/**
 * GN Workflows Client for dajilin
 *
 * This module provides n8n workflow triggers for dajilin using the
 * shared @gn/site-adapters/workflows-client.
 */

import type { GnGatewayContext } from '@gn/gateway-helpers';
import {
  triggerMonitorWorkflow,
  triggerFailureNotifyWorkflow,
  triggerJobStatusPollerWorkflow,
  triggerSiteOnboardingWorkflow,
  triggerSiteAssessmentWorkflow,
  triggerDailySummaryWorkflow,
  type MonitorWorkflowRequest,
  type FailureNotifyRequest,
  type JobStatusPollerRequest,
  type SiteOnboardingRequest,
  type SiteAssessmentRequest,
  type DailySummaryRequest,
} from '@gn/site-adapters/workflows-client';

export type {
  MonitorWorkflowRequest,
  FailureNotifyRequest,
  JobStatusPollerRequest,
  SiteOnboardingRequest,
  SiteAssessmentRequest,
  DailySummaryRequest,
};

/**
 * Create a GN gateway context for dajilin.
 */
export const createWorkflowContext = (overrides?: Partial<GnGatewayContext>): GnGatewayContext => ({
  source: 'site',
  siteId: 'dajilin',
  requestedBy: 'dajilin-website',
  ...overrides,
});

/**
 * Trigger a radar monitor workflow for dajilin.
 */
export const triggerDajilinMonitor = (
  body: MonitorWorkflowRequest,
  context?: GnGatewayContext,
) =>
  triggerMonitorWorkflow(body, context || createWorkflowContext());

/**
 * Trigger a failure notification workflow.
 */
export const triggerDajilinFailureNotify = (
  body: FailureNotifyRequest,
  context?: GnGatewayContext,
) =>
  triggerFailureNotifyWorkflow(body, context || createWorkflowContext());

/**
 * Trigger a job status poller workflow.
 */
export const triggerDajilinJobStatusPoller = (
  body: JobStatusPollerRequest,
  context?: GnGatewayContext,
) =>
  triggerJobStatusPollerWorkflow(body, context || createWorkflowContext());

/**
 * Trigger a site onboarding workflow.
 */
export const triggerDajilinSiteOnboarding = (
  body: SiteOnboardingRequest,
  context?: GnGatewayContext,
) =>
  triggerSiteOnboardingWorkflow(body, context || createWorkflowContext());

/**
 * Trigger a site assessment workflow.
 */
export const triggerDajilinSiteAssessment = (
  body: SiteAssessmentRequest,
  context?: GnGatewayContext,
) =>
  triggerSiteAssessmentWorkflow(body, context || createWorkflowContext());

/**
 * Trigger a daily summary workflow.
 */
export const triggerDajilinDailySummary = (
  body: DailySummaryRequest,
  context?: GnGatewayContext,
) =>
  triggerDailySummaryWorkflow(body, context || createWorkflowContext());
