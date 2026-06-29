import { writing } from '@/content/writing';
import type { WritingIndexViewModel, WritingItem } from '@/types/writing';

export function validateWritingItems(records: readonly WritingItem[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of records) {
    if (!item.id.trim() || !item.slug.trim() || !item.title.trim() || !item.summary.trim()) {
      throw new Error('Writing records require an id, slug, title, and summary.');
    }
    if (ids.has(item.id)) throw new Error(`Duplicate writing id: ${item.id}`);
    if (slugs.has(item.slug)) throw new Error(`Duplicate writing slug: ${item.slug}`);
    if ((item.status === 'published' || item.type === 'external') && !item.href?.trim()) {
      throw new Error(`Public writing item "${item.id}" requires a verified href.`);
    }
    ids.add(item.id);
    slugs.add(item.slug);
  }
}

function sorted(records: readonly WritingItem[]): WritingItem[] {
  validateWritingItems(records);
  return [...records].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.displayPriority - b.displayPriority ||
      (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '') ||
      a.title.localeCompare(b.title),
  );
}

export function getAllWritingItems(records: readonly WritingItem[] = writing): WritingItem[] {
  return sorted(records);
}

export function getPublicWritingItems(records: readonly WritingItem[] = writing): WritingItem[] {
  return getAllWritingItems(records).filter(
    (item) => item.status === 'published',
  );
}

export function getFeaturedWritingItems(records: readonly WritingItem[] = writing): WritingItem[] {
  return getPublicWritingItems(records).filter((item) => item.featured);
}

export function getWritingItemBySlug(slug: string, records: readonly WritingItem[] = writing): WritingItem | undefined {
  return getAllWritingItems(records).find((item) => item.slug === slug);
}

export function getWritingCardViewModels(records: readonly WritingItem[] = writing): WritingItem[] {
  return getPublicWritingItems(records);
}

export function getWritingIndex(): WritingIndexViewModel {
  const items = getWritingCardViewModels();
  return { items, isEmpty: items.length === 0 };
}
