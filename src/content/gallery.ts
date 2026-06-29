import type { GalleryItem } from '@/types/gallery';

// Add records only after optimized local assets are present under public/images.
// The verified gallery is intentionally empty; nonexistent screenshots must not render.
export const galleryItems: GalleryItem[] = [];
