import { describe, expect, it } from 'vitest';

import {
  getAllPublications,
  getFeaturedPublications,
  getPublicationById,
  getPublicationSummary,
  isDaiLeAuthor,
  validatePublications,
} from '@/lib/content';
import type { Publication } from '@/types/publication';

const fixture = (overrides: Partial<Publication> = {}): Publication => ({
  id: 'paper-a',
  title: 'Verified paper',
  authors: [{ name: 'Dai Le', isProfileOwner: true }],
  year: 2025,
  type: 'journal-article',
  links: [],
  tags: ['Research'],
  displayPriority: 20,
  featured: false,
  ...overrides,
});

describe('publication adapters - real records', () => {
  it('returns 8 real publications', () => {
    const pubs = getAllPublications();
    expect(pubs.length).toBe(8);
    expect(getPublicationSummary().isEmpty).toBe(false);
  });

  it('sorts publications by year descending', () => {
    const pubs = getAllPublications();
    const years = pubs.map((p) => p.year ?? 0);
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeLessThanOrEqual(years[i - 1]);
    }
  });

  it('lists the 2026 Science Advances paper first', () => {
    const pubs = getAllPublications();
    expect(pubs[0].id).toBe('dev-2026-efflux-rebinding');
    expect(pubs[0].year).toBe(2026);
    expect(pubs[0].journal).toBe('Science Advances');
  });

  it('returns featured publications', () => {
    const featured = getFeaturedPublications();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it('resolves publications by id', () => {
    expect(getPublicationById('dev-2026-efflux-rebinding')).toBeDefined();
    expect(getPublicationById('le-2023-dissociation-kinetics')).toBeDefined();
    expect(getPublicationById('missing-id')).toBeUndefined();
  });

  it('all publications have DOI links', () => {
    const pubs = getAllPublications();
    for (const pub of pubs) {
      expect(pub.doi ?? pub.url).toBeTruthy();
      expect(pub.links.length).toBeGreaterThan(0);
    }
  });

  it('all publications have bibtex', () => {
    const pubs = getAllPublications();
    for (const pub of pubs) {
      expect(pub.bibtex).toBeTruthy();
    }
  });

  it('all publications expose abstract field (null when unavailable)', () => {
    const pubs = getAllPublications();
    for (const pub of pubs) {
      expect('abstract' in pub).toBe(true);
    }
  });

  it('all 8 publications have real abstracts after update', () => {
    const pubs = getAllPublications();
    for (const pub of pubs) {
      expect(typeof pub.abstract).toBe('string');
      expect((pub.abstract as string).length).toBeGreaterThan(50);
    }
  });

  it('the 2026 Science Advances paper appears exactly once', () => {
    const pubs = getAllPublications();
    const efflux = pubs.filter((p) => p.id === 'dev-2026-efflux-rebinding');
    expect(efflux.length).toBe(1);
    expect(efflux[0].journal).toBe('Science Advances');
    expect(efflux[0].year).toBe(2026);
  });

  it('no publication has "PhD-trained" or em dash in its content', () => {
    const pubs = getAllPublications();
    for (const pub of pubs) {
      const text = JSON.stringify(pub);
      expect(text).not.toContain('PhD-trained');
      expect(text).not.toContain('—');
    }
  });
});

describe('isDaiLeAuthor', () => {
  it('matches "Dai Le"', () => {
    expect(isDaiLeAuthor('Dai Le')).toBe(true);
  });

  it('matches "Le Dai"', () => {
    expect(isDaiLeAuthor('Le Dai')).toBe(true);
  });

  it('matches with extra whitespace', () => {
    expect(isDaiLeAuthor('  Dai Le  ')).toBe(true);
    expect(isDaiLeAuthor('Le  Dai')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isDaiLeAuthor('dai le')).toBe(true);
    expect(isDaiLeAuthor('DAI LE')).toBe(true);
    expect(isDaiLeAuthor('le dai')).toBe(true);
  });

  it('does not match unrelated author names', () => {
    expect(isDaiLeAuthor('Minsu Kim')).toBe(false);
    expect(isDaiLeAuthor('Sukanya Iyer')).toBe(false);
    expect(isDaiLeAuthor('Jessica Coates')).toBe(false);
    expect(isDaiLeAuthor('Le')).toBe(false);
    expect(isDaiLeAuthor('Dai')).toBe(false);
    expect(isDaiLeAuthor('')).toBe(false);
  });
});

describe('publication validation', () => {
  it('rejects duplicate ids', () => {
    expect(() =>
      validatePublications([fixture(), fixture({ title: 'Second paper' })]),
    ).toThrow('Duplicate publication id');
  });

  it('rejects missing authors', () => {
    expect(() => validatePublications([fixture({ authors: [] })])).toThrow('verified author');
  });

  it('rejects empty id or title', () => {
    expect(() => validatePublications([fixture({ id: '' })])).toThrow();
    expect(() => validatePublications([fixture({ title: '' })])).toThrow();
  });
});
