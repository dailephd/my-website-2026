import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { getHomepageViewModel } from '@/lib/content';
import { routes } from '@/lib/routes';

describe('M7 homepage view model', () => {
  it('composes identity and deterministic local-content previews', () => {
    const first = getHomepageViewModel();
    const second = getHomepageViewModel();

    expect(first.profile.name).toBe('Dai Le');
    expect(first.featuredProjects.length).toBeGreaterThan(0);
    expect(first.featuredProjects.map(({ id }) => id)).toEqual(
      second.featuredProjects.map(({ id }) => id),
    );
    expect(first.featuredProducts[0]?.item.title).toBe('my-dev-kit Ecosystem');
    expect(first.ecosystem.slug).toBe('my-dev-kit');
    expect(first.roadmapPreview?.roadmap.slug).toBe('my-dev-kit');
  });

  it('derives hero and contact actions from link content', () => {
    const home = getHomepageViewModel();

    expect(home.heroLinks.map(({ href }) => href)).toEqual([routes.work, routes.products]);
    expect(home.contactLinks.map(({ href }) => href)).toEqual([
      routes.work,
      routes.products,
      routes.contact,
    ]);
  });

  it('uses a safe credibility summary instead of placeholder publication data', () => {
    const home = getHomepageViewModel();

    expect(home.copy.credibility.summary).toContain('PhD');
    expect(home.copy.credibility.summary).not.toContain('TBD');
  });

  it('keeps structured project, product, and roadmap arrays out of the route', () => {
    const pageSource = readFileSync('src/app/page.tsx', 'utf8');

    expect(pageSource).toContain('getHomepageViewModel');
    expect(pageSource).not.toMatch(/\b(const|let)\s+(projects|products|roadmaps)\s*=\s*\[/);
  });
});
