import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { routes } from '@/lib/routes';
import { routeMetadata } from '@/lib/seo/metadata';

const repoRoot = path.resolve('.');

describe('/work route removal', () => {
  it('src/app/work/page.tsx does not exist', () => {
    expect(existsSync(path.join(repoRoot, 'src/app/work/page.tsx'))).toBe(false);
  });

  it('routes object does not include /work', () => {
    expect(Object.values(routes)).not.toContain('/work');
  });

  it('routeMetadata does not include a work entry', () => {
    expect(Object.values(routeMetadata).map((r) => r.path)).not.toContain('/work');
  });

  it('sitemap derives from routeMetadata which excludes /work', () => {
    const paths = Object.values(routeMetadata).map((r) => r.path);
    expect(paths).not.toContain('/work');
    expect(paths).toContain('/projects');
    expect(paths).toContain('/contact');
  });
});

describe('contact API input validation', () => {
  it('EMAIL_RE rejects clearly invalid emails', () => {
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(EMAIL_RE.test('not-an-email')).toBe(false);
    expect(EMAIL_RE.test('@nodomain')).toBe(false);
    expect(EMAIL_RE.test('user@')).toBe(false);
    expect(EMAIL_RE.test('')).toBe(false);
  });

  it('EMAIL_RE accepts valid emails', () => {
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(EMAIL_RE.test('user@example.com')).toBe(true);
    expect(EMAIL_RE.test('dai@dailephd.com')).toBe(true);
    expect(EMAIL_RE.test('a+b@sub.domain.org')).toBe(true);
  });
});

describe('"View selected work" link removal', () => {
  it('primaryCta no longer points to /work', () => {
    const links = Object.values(routes);
    expect(links).not.toContain('/work');
  });
});
