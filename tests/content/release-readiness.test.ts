import { afterEach, describe, expect, it, vi } from 'vitest';

import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { resolveOpenGraphImage } from '@/lib/seo/open-graph';
import { routeMetadata } from '@/lib/seo/metadata';
import { createAbsoluteUrl, getSiteUrl, normalizeSiteUrl } from '@/lib/seo/site-url';
import { routes } from '@/lib/routes';

afterEach(() => vi.unstubAllEnvs());

describe('site URL — production safety', () => {
  it('falls back to localhost when NEXT_PUBLIC_SITE_URL is invalid', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not-a-valid-url');
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });

  it('strips trailing slash and query/hash from production URL', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://dailephd.com/?utm=1#anchor');
    expect(getSiteUrl()).toBe('https://dailephd.com');
  });

  it('generates correct absolute URLs with a production domain', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://dailephd.com');
    expect(createAbsoluteUrl('/projects/my-dev-kit')).toBe('https://dailephd.com/projects/my-dev-kit');
    expect(createAbsoluteUrl('/')).toBe('https://dailephd.com/');
  });

  it('normalizeSiteUrl rejects obviously invalid URLs', () => {
    expect(() => normalizeSiteUrl('not-a-url')).toThrow();
  });
});

describe('route registry completeness', () => {
  it('every route in routes.ts has a corresponding metadata entry', () => {
    const routePaths = Object.values(routes).sort();
    const metadataPaths = Object.values(routeMetadata).map(({ path }) => path).sort();
    expect(metadataPaths).toEqual(routePaths);
  });

  it('every metadata entry has a non-empty title and description', () => {
    for (const entry of Object.values(routeMetadata)) {
      expect(entry.title.trim(), `${entry.key} title must not be empty`).not.toBe('');
      expect(entry.description.trim(), `${entry.key} description must not be empty`).not.toBe('');
    }
  });

  it('sitemap covers exactly the routes in routes.ts — no extras, no missing', () => {
    const sitemapPaths = sitemap().map(({ url }) => new URL(url).pathname).sort();
    const registeredPaths = Object.values(routes).sort();
    expect(sitemapPaths).toEqual(registeredPaths);
  });
});

describe('robots safety', () => {
  it('allows all crawlers when NEXT_PUBLIC_NOINDEX is absent', () => {
    const output = robots();
    expect(output.rules).toEqual([{ userAgent: '*', allow: '/' }]);
  });

  it('allows all crawlers when NEXT_PUBLIC_NOINDEX is "false"', () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', 'false');
    const output = robots();
    expect(output.rules).toEqual([{ userAgent: '*', allow: '/' }]);
  });

  it('blocks all crawlers only when NEXT_PUBLIC_NOINDEX is exactly "true"', () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', 'true');
    expect(robots().rules).toEqual([{ userAgent: '*', disallow: '/' }]);
  });

  it('sitemap URL in robots uses production domain when NEXT_PUBLIC_SITE_URL is set', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://dailephd.com');
    expect(robots().sitemap).toBe('https://dailephd.com/sitemap.xml');
  });
});

describe('OG image fallback safety', () => {
  it('returns undefined for all current 1x1 placeholder images', () => {
    for (const name of ['default-og.png', 'home-og.png', 'work-og.png', 'products-og.png']) {
      expect(
        resolveOpenGraphImage(`/images/og/${name}`, 'test'),
        `${name} must not resolve (placeholder)`,
      ).toBeUndefined();
    }
  });

  it('returns undefined for page-specific OG images that do not yet exist', () => {
    const missing = ['my-dev-kit-og.png', 'projects-og.png', 'about-og.png', 'publications-og.png', 'contact-og.png'];
    for (const name of missing) {
      expect(
        resolveOpenGraphImage(`/images/og/${name}`, 'test'),
        `${name} must not resolve (not yet created)`,
      ).toBeUndefined();
    }
  });

  it('returns undefined for a completely nonexistent image path', () => {
    expect(resolveOpenGraphImage('/images/og/nonexistent.png', 'test')).toBeUndefined();
  });

  it('returns undefined when path is undefined', () => {
    expect(resolveOpenGraphImage(undefined, 'test')).toBeUndefined();
  });
});
