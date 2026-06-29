import GalleryGrid from '@/components/gallery/GalleryGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import type { GallerySectionViewModel } from '@/types/gallery';

export default function GalleryPreviewSection({ gallery }: { gallery: GallerySectionViewModel }) {
  return (
    <section aria-labelledby="project-media-heading">
      <SectionHeader
        description="Selected interface and workflow captures, published only when optimized assets and accessible metadata are available."
        headingId="project-media-heading"
        title="Project media"
      />
      <GalleryGrid items={gallery.items} />
    </section>
  );
}
