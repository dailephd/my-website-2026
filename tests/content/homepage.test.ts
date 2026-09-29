import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { getHomepageViewModel } from '@/lib/content';
import { routes } from '@/lib/routes';

describe('M7 homepage view model', () => {
  it('composes identity and deterministic local-content previews', () => {
    const first = getHomepageViewModel();
    const second = getHomepageViewModel();

    expect(first.profile.name).toBe('Dai Le');
    expect(first.featuredProducts[0]?.item.title).toBe('my-dev-kit Ecosystem');
    expect(first.featuredProducts).toHaveLength(1);
    expect(first.featuredProducts[0]?.item.summary).toContain('browser/runtime evidence');
    expect(first.featuredProducts[0]?.item.positioning).toContain('Four local-first tools');
    expect(first.featuredProducts.map(({ item }) => item.id)).toEqual(
      second.featuredProducts.map(({ item }) => item.id),
    );
  });

  it('does not render the removed ecosystem workflow sentence', () => {
    const pageSource = readFileSync('src/components/sections/FeaturedWorkSection.tsx', 'utf8');

    expect(pageSource).not.toContain(
      'Understand the repository, structure the implementation workflow, then validate the result and process.',
    );
  });

  it('derives hero actions from link content', () => {
    const home = getHomepageViewModel();

    expect(home.heroLinks.map(({ href }) => href)).toEqual([routes.projects, routes.contact]);
  });

  it('renders the two background cards with valid CTA routes', () => {
    const home = getHomepageViewModel();
    const cards = home.copy.background.cards;

    expect(cards.map((card) => card.title)).toEqual(['Biological Sciences', 'About Dai Le']);
    expect(cards.find((card) => card.id === 'biological-sciences')?.cta.href).toBe(routes.publications);
    expect(cards.find((card) => card.id === 'about-dai-le')?.cta.href).toBe(routes.about);
    expect(cards.every((card) => !card.body.includes('—') && !card.supportingText.includes('—'))).toBe(
      true,
    );
  });

  it('keeps structured project, product, and roadmap arrays out of the route', () => {
    const pageSource = readFileSync('src/app/page.tsx', 'utf8');

    expect(pageSource).toContain('getHomepageViewModel');
    expect(pageSource).not.toMatch(/\b(const|let)\s+(projects|products|roadmaps)\s*=\s*\[/);
  });
});
