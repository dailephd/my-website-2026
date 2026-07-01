import { describe, expect, it } from 'vitest';

import { profile } from '@/content/profile';
import { getNavigationLinks } from '@/lib/content';

describe('basic accessibility content assumptions', () => {
  it('has a profile name for the page heading', () => {
    expect(profile.name.length).toBeGreaterThan(0);
  });

  it('navigation links all have non-empty labels', () => {
    const links = getNavigationLinks();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.label.trim().length).toBeGreaterThan(0);
      expect(link.href.trim().length).toBeGreaterThan(0);
    }
  });

  it('navigation links have valid href values', () => {
    const links = getNavigationLinks();
    for (const link of links) {
      expect(link.href).toMatch(/^\//);
    }
  });
});
