import type { GalleryItem } from '@/types/gallery';
import GalleryEmptyState from './GalleryEmptyState';
import MediaCard from './MediaCard';

export default function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  if (items.length === 0) return <GalleryEmptyState />;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <MediaCard item={item} key={item.id} priority={index === 0 && item.featured} />
      ))}
    </div>
  );
}
