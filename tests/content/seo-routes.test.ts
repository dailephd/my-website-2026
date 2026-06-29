import { afterEach, describe, expect, it, vi } from 'vitest';

import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { routes } from '@/lib/routes';

afterEach(() => vi.unstubAllEnvs());

describe('SEO route outputs', () => {
  it('sitemap includes only existing public routes', () => {
    const urls = sitemap().map(({ url }) => new URL(url).pathname);
    expect(urls.sort()).toEqual(Object.values(routes).sort());
    expect(urls.some((url) => url.includes('/writing/'))).toBe(false);
  });

  it('robots allows crawling and includes an absolute sitemap by default', () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', '');
    const output = robots();
    expect(output.rules).toEqual([{ userAgent: '*', allow: '/' }]);
    expect(output.sitemap).toBe('http://localhost:3000/sitemap.xml');
  });

  it('robots supports an explicit noindex environment flag', () => {
    vi.stubEnv('NEXT_PUBLIC_NOINDEX', 'true');
    expect(robots().rules).toEqual([{ userAgent: '*', disallow: '/' }]);
  });
});
