import { describe, expect, it } from 'vitest';

import {
  getAllWritingItems,
  getFeaturedWritingItems,
  getPublicWritingItems,
  getWritingIndex,
  getWritingItemBySlug,
  validateWritingItems,
} from '@/lib/content';
import type { WritingItem } from '@/types/writing';

const item = (overrides: Partial<WritingItem> = {}): WritingItem => ({
  id: 'note-a',
  slug: 'note-a',
  title: 'Verified note',
  summary: 'A verified writing fixture.',
  status: 'published',
  type: 'note',
  tags: [],
  displayPriority: 20,
  featured: false,
  href: '/writing/note-a',
  ...overrides,
});

describe('writing adapters', () => {
  it('sorts deterministically without mutating records', () => {
    const source = [item(), item({ id: 'b', slug: 'b', title: 'Featured', featured: true })];
    expect(getAllWritingItems(source).map(({ id }) => id)).toEqual(['b', 'note-a']);
    expect(source[0].id).toBe('note-a');
  });

  it('excludes draft and planned items from public and featured results', () => {
    const source = [
      item({ featured: true }),
      item({ id: 'draft', slug: 'draft', status: 'draft', href: undefined, featured: true }),
      item({ id: 'planned', slug: 'planned', status: 'planned', href: undefined }),
    ];
    expect(getPublicWritingItems(source).map(({ id }) => id)).toEqual(['note-a']);
    expect(getFeaturedWritingItems(source).map(({ id }) => id)).toEqual(['note-a']);
  });

  it('looks up by slug and rejects duplicate ids or slugs', () => {
    expect(getWritingItemBySlug('note-a', [item()])?.title).toBe('Verified note');
    expect(() => validateWritingItems([item(), item({ slug: 'other' })])).toThrow('Duplicate writing id');
    expect(() => validateWritingItems([item(), item({ id: 'other' })])).toThrow('Duplicate writing slug');
  });

  it('handles the verified-empty index', () => {
    expect(getWritingIndex()).toEqual({ items: [], isEmpty: true });
  });
});
