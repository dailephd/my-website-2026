import { describe, expect, it } from 'vitest';

import { getContactIntro, getContactPanel, getProfileLinks } from '@/lib/content';

describe('contact adapters', () => {
  it('getContactIntro returns the intro string', () => {
    const intro = getContactIntro();
    expect(typeof intro).toBe('string');
    expect(intro.length).toBeGreaterThan(0);
  });

  it('getProfileLinks returns LinkedIn and GitHub', () => {
    const links = getProfileLinks();
    const ids = links.map((l) => l.id);
    expect(ids).toContain('linkedin');
    expect(ids).toContain('github');
  });

  it('LinkedIn link points to the correct profile URL', () => {
    const links = getProfileLinks();
    const linkedin = links.find((l) => l.id === 'linkedin');
    expect(linkedin?.href).toBe('https://linkedin.com/in/dailephd');
    expect(linkedin?.external).toBe(true);
  });

  it('GitHub link points to the correct profile URL', () => {
    const links = getProfileLinks();
    const github = links.find((l) => l.id === 'github');
    expect(github?.href).toBe('https://github.com/dailephd');
    expect(github?.external).toBe(true);
  });

  it('getContactPanel returns a panel with hasDirectEmail true', () => {
    const panel = getContactPanel();
    expect(panel.hasDirectEmail).toBe(true);
  });
});
