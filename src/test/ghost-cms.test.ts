/**
 * Ghost CMS Connection Test
 *
 * Note: These tests run without loading .env.local.
 * Manual verification can be done via the API.
 */
import { describe, it, expect } from 'vitest';
import { getPosts, getTags } from '../lib/ghost-cms';

describe('Ghost CMS Connection', () => {
  it('should fetch posts without throwing', async () => {
    const posts = await getPosts({ limit: 5 });
    expect(Array.isArray(posts)).toBe(true);
  });

  it('should fetch tags without throwing', async () => {
    const tags = await getTags();
    expect(Array.isArray(tags)).toBe(true);
  });
});
