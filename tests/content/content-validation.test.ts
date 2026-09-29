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
  });

  it('describes frontier-model evaluation and benchmark design in the About profile', () => {
    const profile = getProfile();
    expect(profile.intro).toContain('frontier-model evaluation');
    expect(profile.intro).toContain('advanced AI models and coding agents');
    expect(profile.professionalSummary).toContain('benchmark design');
    expect(profile.professionalSummary).toContain('task specifications, evidence design, scoring and verification');
    expect(profile.aiComputingSummary).toContain('rubrics and acceptance criteria');
    expect(profile.aiComputingSummary).toContain('failure modes');
    expect(profile.aiComputingSummary).toContain('shortcuts or superficial success');
    expect(profile.technicalFocus.find((item) => item.id === 'applied-ai')?.summary).toContain('difficulty calibration');
    expect(profile.aiComputingSummary).not.toContain('data annotation');
  });

  it('returns primary links in display-priority order', () => {
    const links = getPrimaryLinks();

    expect(links.length).toBe(2);
    expect(links.map((link) => link.href)).toEqual([routes.projects, routes.contact]);
    expect(links[0].displayPriority).toBeLessThan(links[1].displayPriority);
  });

  it('returns the expected navigation routes', () => {
    expect(getNavigationLinks().map((link) => link.href)).toEqual([
      routes.home,
      routes.projects,
      routes.publications,
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
