import { describe, expect, it } from 'vitest';

import {
  getFooterLinks,
  getNavigationLinks,
  getPrimaryLinks,
  getProfile,
} from '@/lib/content';
import { validateContent } from '@/lib/content/validate-content';
import { routes } from '@/lib/routes';

describe('M1 content adapters', () => {
  it('returns the required profile identity fields', () => {
    const profile = getProfile();

    expect(profile.name).toBe('Dai Le');
    expect(profile.headline).toBeTruthy();
    expect(profile.subheadline).toBeTruthy();
    expect(profile.summary).toBeTruthy();
    expect(profile.primaryRoleLabels.length).toBeGreaterThan(0);
  });

  it('returns primary links in display-priority order', () => {
    const links = getPrimaryLinks();

    expect(links.length).toBe(2);
    expect(links.map((link) => link.href)).toEqual([routes.work, routes.products]);
    expect(links[0].displayPriority).toBeLessThan(links[1].displayPriority);
  });

  it('returns the expected navigation routes', () => {
    expect(getNavigationLinks().map((link) => link.href)).toEqual([
      routes.home,
      routes.work,
      routes.products,
      routes.writing,
      routes.about,
      routes.contact,
    ]);
  });

  it('returns stable footer links', () => {
    const links = getFooterLinks();

    expect(links.length).toBeGreaterThan(0);
    expect(new Set(links.map((link) => link.id)).size).toBe(links.length);
    expect(links.every((link) => link.locations.includes('footer'))).toBe(true);
  });

  it('reports the current M1 content as valid', () => {
    expect(validateContent()).toEqual({ valid: true, issues: [] });
  });
});
