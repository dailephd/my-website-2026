import { describe, expect, it } from 'vitest';

import {
  getAllGalleryItems,
  getFeaturedGalleryItems,
  getGalleryItemsByCategory,
  getGalleryItemsByPlacement,
  getGalleryItemsByProductSlug,
  getGalleryItemsByProjectSlug,
  getMediaCardViewModels,
  validateGalleryItems,
} from '@/lib/content';
import type { GalleryItem } from '@/types/gallery';

const item = (overrides: Partial<GalleryItem> = {}): GalleryItem => ({
  id: 'media-a',
  title: 'Verified interface',
  src: '/images/projects/demo.webp',
  alt: 'A verified project interface',
  kind: 'project-screenshot',
  category: 'selected-work',
  caption: '',
  width: 1200,
  height: 750,
  displayPriority: 20,
  featured: false,
  projectSlug: 'demo',
  productSlug: 'product-demo',
  pagePlacement: ['work'],
  ...overrides,
});
const exists = () => true;

describe('gallery adapters', () => {
  it('sorts featured items and priorities deterministically without mutation', () => {
    const source = [
      item(),
      item({ id: 'media-b', title: 'Featured', featured: true, displayPriority: 30 }),
      item({ id: 'media-c', title: 'First', displayPriority: 10 }),
    ];
    expect(getAllGalleryItems(source, exists).map(({ id }) => id)).toEqual(['media-b', 'media-c', 'media-a']);
    expect(source.map(({ id }) => id)).toEqual(['media-a', 'media-b', 'media-c']);
  });

  it('filters by featured state, category, associations, and placement', () => {
    const source = [item({ featured: true }), item({ id: 'other', category: 'general', projectSlug: undefined, productSlug: undefined, pagePlacement: ['about'] })];
    expect(getFeaturedGalleryItems(source, exists)).toHaveLength(1);
    expect(getGalleryItemsByCategory('general', source, exists)[0]?.id).toBe('other');
    expect(getGalleryItemsByProjectSlug('demo', source, exists)).toHaveLength(1);
    expect(getGalleryItemsByProductSlug('product-demo', source, exists)).toHaveLength(1);
    expect(getGalleryItemsByPlacement('work', source, exists)).toHaveLength(1);
  });

  it('rejects duplicate ids, missing assets, dimensions, and meaningful alt text', () => {
    expect(() => validateGalleryItems([item(), item()], exists)).toThrow('Duplicate gallery id');
    expect(() => validateGalleryItems([item()], () => false)).toThrow('Missing local gallery asset');
    expect(() => validateGalleryItems([item({ width: 0 })], exists)).toThrow('positive width');
    expect(() => validateGalleryItems([item({ alt: '' })], exists)).toThrow('meaningful alt text');
  });

  it('handles the verified-empty gallery safely', () => {
    expect(getAllGalleryItems()).toEqual([]);
    expect(getMediaCardViewModels('work')).toEqual({ items: [], isEmpty: true });
  });
});
