/**
 * Ghost CMS Client for dajilin.net
 *
 * Separate Ghost CMS instance dedicated to dajilin project.
 * Used for managing study tour content, guides, and CMS-driven pages.
 *
 * Content Types:
 * - study-tours: Industrial study tour content
 * - guides: Travel guides and information
 * - destinations: Destination information (optional)
 */

import GhostContentAPI from '@tryghost/content-api';

// Ghost CMS API client for dajilin
const api = new GhostContentAPI({
  url: import.meta.env.GHOST_API_URL || 'http://localhost:2368',
  key: import.meta.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0',
});

let ghostUnavailableNotified = false;

function normalizeErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

function hasNetworkCode(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  const err = error as {
    code?: unknown;
    cause?: unknown;
    errors?: unknown;
    message?: unknown;
  };
  const codes = new Set(['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT']);

  if (typeof err.code === 'string' && codes.has(err.code.toUpperCase())) {
    return true;
  }

  if (typeof err.message === 'string') {
    const upper = err.message.toUpperCase();
    for (const code of codes) {
      if (upper.includes(code)) return true;
    }
  }

  if (Array.isArray(err.errors)) {
    for (const nested of err.errors) {
      if (hasNetworkCode(nested)) return true;
    }
  }

  if (err.cause && hasNetworkCode(err.cause)) {
    return true;
  }

  return false;
}

function isConnectionRefused(error: unknown): boolean {
  if (hasNetworkCode(error)) return true;
  const message = normalizeErrorMessage(error).toUpperCase();
  return message.includes('ECONNREFUSED') || message.includes('ENOTFOUND') || message.includes('ETIMEDOUT');
}

function reportGhostError(context: string, error: unknown): void {
  const message = normalizeErrorMessage(error);
  const likelyOffline =
    isConnectionRefused(error) ||
    message === 'Error' ||
    message.includes('AxiosError');

  if (likelyOffline) {
    if (!ghostUnavailableNotified) {
      ghostUnavailableNotified = true;
      console.warn(`[ghost:dajilin] ${context}: CMS unavailable, using fallback data.`);
    }
    return;
  }
  console.error(`[ghost:dajilin] ${context}: ${message}`);
}

// Ghost Content Types
export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  reading_time: number;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
  primary_author?: GhostAuthor;
  primary_tag?: GhostTag;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
  visibility: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
}

export interface GhostPage {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  updated_at: string;
  created_at: string;
}

export interface GetPostsOptions {
  limit?: number | 'all';
  page?: number;
  filter?: string;
  include?: string;
  order?: string;
}

// Content type tags for dajilin
export const CONTENT_TAGS = {
  STUDY_TOUR: 'study-tour',
  DESTINATION: 'destination',
  SELF_DRIVE: 'self-drive',
  THEME: 'theme',
  OFFICIAL_SERVICE: 'official-service',
} as const;

/**
 * Get all posts from Ghost CMS
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<GhostPost[]> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    console.warn('[ghost:dajilin] GHOST_CONTENT_API_KEY not configured');
    return [];
  }

  try {
    const posts = await api.posts.browse({
      limit: options.limit || 'all',
      include: options.include || 'tags,authors',
      order: options.order || 'published_at DESC',
      filter: options.filter,
      page: options.page,
    });
    return posts as GhostPost[];
  } catch (error) {
    reportGhostError('getPosts', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPost(slug: string): Promise<GhostPost | null> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    return null;
  }

  try {
    const post = await api.posts.read(
      { slug },
      { include: 'tags,authors' }
    );
    return post as GhostPost;
  } catch (error) {
    reportGhostError(`getPost(${slug})`, error);
    return null;
  }
}

/**
 * Get all tags from Ghost CMS
 */
export async function getTags(): Promise<GhostTag[]> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    return [];
  }

  try {
    const tags = await api.tags.browse({
      limit: 'all',
      order: 'name ASC',
    });
    return tags as GhostTag[];
  } catch (error) {
    reportGhostError('getTags', error);
    return [];
  }
}

/**
 * Get posts by tag slug (for dajilin content types)
 */
export async function getPostsByTag(
  tagSlug: string,
  options: GetPostsOptions = {}
): Promise<GhostPost[]> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    return [];
  }

  try {
    const posts = await api.posts.browse({
      limit: options.limit || 'all',
      include: options.include || 'tags,authors',
      order: options.order || 'published_at DESC',
      filter: `tag:${tagSlug}`,
      page: options.page,
    });
    return posts as GhostPost[];
  } catch (error) {
    reportGhostError(`getPostsByTag(${tagSlug})`, error);
    return [];
  }
}

/**
 * Get study tour posts
 */
export async function getStudyTourPosts(
  options: GetPostsOptions = {}
): Promise<GhostPost[]> {
  return getPostsByTag(CONTENT_TAGS.STUDY_TOUR, options);
}

/**
 * Get destination posts
 */
export async function getDestinationPosts(
  options: GetPostsOptions = {}
): Promise<GhostPost[]> {
  return getPostsByTag(CONTENT_TAGS.DESTINATION, options);
}

/**
 * Get guide posts
 */
export async function getGuidePosts(
  options: GetPostsOptions = {}
): Promise<GhostPost[]> {
  // Guides are posts with 'guide' tag or in guides section
  return getPostsByTag('guide', options);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<GhostPost[]> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    return [];
  }

  try {
    const posts = await api.posts.browse({
      limit,
      include: 'tags,authors',
      order: 'published_at DESC',
      filter: 'featured:true',
    });
    return posts as GhostPost[];
  } catch (error) {
    reportGhostError('getFeaturedPosts', error);
    return [];
  }
}

/**
 * Get a single page by slug
 */
export async function getPage(slug: string): Promise<GhostPage | null> {
  if (!import.meta.env.GHOST_CONTENT_API_KEY) {
    return null;
  }

  try {
    const page = await api.pages.read({ slug });
    return page as GhostPage;
  } catch (error) {
    reportGhostError(`getPage(${slug})`, error);
    return null;
  }
}

/**
 * Check if Ghost CMS is configured and reachable
 */
export function isGhostConfigured(): boolean {
  return Boolean(import.meta.env.GHOST_CONTENT_API_KEY && import.meta.env.GHOST_API_URL);
}

export default api;
