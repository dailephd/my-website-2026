import Card from '@/components/ui/Card';

export default function GalleryEmptyState() {
  return (
    <Card className="hero-backdrop border-dashed p-7 sm:p-9">
      <h3 className="text-lg font-semibold">Media showcase in preparation</h3>
      <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">
        Verified, optimized project screenshots have not been added yet. This section will display
        media only after the source files, dimensions, captions, and alt text are confirmed.
      </p>
    </Card>
  );
}
