import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  buildCanonicalUrl,
  buildPageMetadata,
  buildPageTitle,
  getRouteMetadata,
  routeMetadata,
} from '@/lib/seo/metadata';
import { resolveOpenGraphImage } from '@/lib/seo/open-graph';
import {
  createAbsoluteUrl,
  getSiteUrl,
  normalizePath,
  normalizeSiteUrl,
} from '@/lib/seo/site-url';
import {
  buildPersonJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
} from '@/lib/seo/structured-data';
import { routes } from '@/lib/routes';
import { getMyDevKitEcosystem } from '@/lib/content/get-products';

afterEach(() => vi.unstubAllEnvs());

describe('site URL helpers', () => {
  it('uses configured URL and normalizes duplicate or trailing slashes', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.test/base//');
    expect(getSiteUrl()).toBe('https://example.test/base');
    expect(normalizeSiteUrl('https://example.test///')).toBe('https://example.test');
    expect(normalizePath('//projects//my-dev-kit/')).toBe('/projects/my-dev-kit');
  });

  it('uses a safe fallback and creates absolute root and nested URLs', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    expect(getSiteUrl()).toBe('http://localhost:3000');
    expect(createAbsoluteUrl('/')).toBe('http://localhost:3000/');
    expect(createAbsoluteUrl('/projects')).toBe('http://localhost:3000/projects');
  });
});

describe('metadata helpers', () => {
  it('builds branded titles, absolute canonicals, Open Graph and Twitter data', () => {
    const metadata = buildPageMetadata(routeMetadata.projects);
    expect(buildPageTitle('Technical Projects')).toBe('Technical Projects | Dai Le');
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe('http://localhost:3000/projects');
    expect(metadata.openGraph?.title).toBe('Technical Projects | Dai Le');
    expect(metadata.twitter).toMatchObject({ card: 'summary' });
  });

  it('omits invalid placeholder images and covers exactly the public route registry', () => {
    expect(resolveOpenGraphImage('/images/og/projects-og.png', 'Projects')).toBeUndefined();
    expect(Object.values(routeMetadata).map(({ path }) => path).sort()).toEqual(
      Object.values(routes).sort(),
    );
    expect(getRouteMetadata('/missing')).toBeUndefined();
    expect(buildCanonicalUrl('/about')).toMatch(/^http:\/\/localhost:3000\/about$/);
  });

  it('derives ecosystem metadata from the updated family positioning', () => {
    expect(routeMetadata.projectMyDevKit.description).toBe(getMyDevKitEcosystem().positioning);
    expect(buildPageMetadata(routeMetadata.projectMyDevKit).description).toBe('Local-first evidence and workflow infrastructure for disciplined AI-assisted software development.');
  });
});

describe('structured data', () => {
  it('uses verified profile and site content with absolute URLs', () => {
    expect(buildPersonJsonLd()).toMatchObject({
      '@type': 'Person',
      name: 'Dai Le',
      url: 'http://localhost:3000/about',
    });
    expect(buildWebSiteJsonLd()).toMatchObject({
      '@type': 'WebSite',
      name: 'Dai Le',
      url: 'http://localhost:3000/',
    });
    expect(buildWebPageJsonLd(routeMetadata.projects)).toMatchObject({
      '@type': 'CollectionPage',
      url: 'http://localhost:3000/projects',
    });
  });

  it('contains no invented organization, social, null, or undefined fields', () => {
    const serialized = serializeJsonLd(buildPersonJsonLd());
    expect(serialized).not.toContain('Organization');
    expect(serialized).not.toContain('sameAs');
    expect(serialized).not.toContain('null');
    expect(serialized).not.toContain('undefined');
  });
});
