import { existsSync } from 'node:fs';
import path from 'node:path';

import { galleryItems } from '@/content/gallery';
import type {
  GalleryCategory,
  GalleryItem,
  GalleryPlacement,
  GallerySectionViewModel,
} from '@/types/gallery';

const allowedKinds = new Set<GalleryItem['kind']>([
  'project-screenshot',
  'product-screenshot',
  'profile',
  'diagram',
  'visual',
]);
const allowedCategories = new Set<GalleryCategory>([
  'selected-work',
  'product-lab',
  'my-dev-kit',
  'about',
  'profile',
  'general',
]);

export function localGalleryAssetExists(src: string): boolean {
  if (!src.startsWith('/images/')) return false;
  return existsSync(path.join(process.cwd(), 'public', ...src.split('/').filter(Boolean)));
}

export function validateGalleryItems(
  records: readonly GalleryItem[],
  assetExists: (src: string) => boolean = localGalleryAssetExists,
): void {
  const ids = new Set<string>();
  for (const item of records) {
    if (!item.id.trim() || !item.title.trim() || !item.src.trim()) {
      throw new Error('Gallery records require an id, title, and src.');
    }
    if (!item.decorative && !item.alt.trim()) {
      throw new Error(`Gallery item "${item.id}" requires meaningful alt text.`);
    }
    if (item.width <= 0 || item.height <= 0) {
      throw new Error(`Gallery item "${item.id}" requires positive width and height.`);
    }
    if (!allowedKinds.has(item.kind) || !allowedCategories.has(item.category)) {
      throw new Error(`Gallery item "${item.id}" uses an unsupported kind or category.`);
    }
    if (ids.has(item.id)) throw new Error(`Duplicate gallery id: ${item.id}`);
    if (!assetExists(item.src)) throw new Error(`Missing local gallery asset: ${item.src}`);
    ids.add(item.id);
  }
}

function sorted(
  records: readonly GalleryItem[],
  assetExists: (src: string) => boolean = localGalleryAssetExists,
): GalleryItem[] {
  validateGalleryItems(records, assetExists);
  return [...records].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.displayPriority - b.displayPriority ||
      a.title.localeCompare(b.title),
  );
}

export function getAllGalleryItems(
  records: readonly GalleryItem[] = galleryItems,
  assetExists?: (src: string) => boolean,
): GalleryItem[] {
  return sorted(records, assetExists);
}

export const getGallery = getAllGalleryItems;

export function getFeaturedGalleryItems(records: readonly GalleryItem[] = galleryItems, assetExists?: (src: string) => boolean): GalleryItem[] {
  return getAllGalleryItems(records, assetExists).filter((item) => item.featured);
}

export function getGalleryItemsByCategory(category: GalleryCategory, records: readonly GalleryItem[] = galleryItems, assetExists?: (src: string) => boolean): GalleryItem[] {
  return getAllGalleryItems(records, assetExists).filter((item) => item.category === category);
}

export function getGalleryItemsByProjectSlug(projectSlug: string, records: readonly GalleryItem[] = galleryItems, assetExists?: (src: string) => boolean): GalleryItem[] {
  return getAllGalleryItems(records, assetExists).filter((item) => item.projectSlug === projectSlug);
}

export function getGalleryItemsByProductSlug(productSlug: string, records: readonly GalleryItem[] = galleryItems, assetExists?: (src: string) => boolean): GalleryItem[] {
  return getAllGalleryItems(records, assetExists).filter((item) => item.productSlug === productSlug);
}

export function getGalleryItemsByPlacement(placement: GalleryPlacement, records: readonly GalleryItem[] = galleryItems, assetExists?: (src: string) => boolean): GalleryItem[] {
  return getAllGalleryItems(records, assetExists).filter((item) => item.pagePlacement?.includes(placement));
}

export function getMediaCardViewModels(placement?: GalleryPlacement): GallerySectionViewModel {
  const items = placement ? getGalleryItemsByPlacement(placement) : getAllGalleryItems();
  return { items, isEmpty: items.length === 0 };
}
