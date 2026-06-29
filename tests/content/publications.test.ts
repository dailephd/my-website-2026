import { describe, expect, it } from 'vitest';

import {
  getAllPublications,
  getFeaturedPublications,
  getPublicationById,
  getPublicationSummary,
  validatePublications,
} from '@/lib/content';
import type { Publication } from '@/types/publication';

const record = (overrides: Partial<Publication> = {}): Publication => ({
  id: 'paper-a',
  title: 'Verified paper',
  authors: [{ name: 'Dai Le', isProfileOwner: true }],
  year: 2025,
  summary: 'A verified test fixture.',
  type: 'journal-article',
  links: [],
  tags: ['Research'],
  displayPriority: 20,
  featured: false,
  ...overrides,
});

describe('publication adapters', () => {
  it('returns a deterministic, verified-empty collection', () => {
    expect(getAllPublications()).toEqual([]);
    expect(getAllPublications()).not.toBe(getAllPublications());
    expect(getPublicationSummary()).toEqual({ publications: [], isEmpty: true });
  });

  it('returns only featured records and resolves records by id safely', () => {
    expect(getFeaturedPublications()).toEqual([]);
    expect(getPublicationById('missing')).toBeUndefined();
  });

  it('rejects duplicate ids and missing verified authors', () => {
    expect(() => validatePublications([record(), record({ title: 'Second paper' })])).toThrow(
      'Duplicate publication id',
    );
    expect(() => validatePublications([record({ authors: [] })])).toThrow('verified author');
  });
});
