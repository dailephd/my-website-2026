import Link from 'next/link';
import Card from '@/components/ui/Card';
import RoadmapUpdatedLabel from './RoadmapUpdatedLabel';
import type { RoadmapPreviewViewModel } from '@/types/roadmap';

export default function RoadmapPreview({
  preview,
  href,
  headingLevel = 2,
}: {
  preview: RoadmapPreviewViewModel;
  href: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const groups = [
    ['Recently shipped', preview.recentlyShipped],
    ['Current focus', preview.currentFocus],
    ['Next planned', preview.nextPlanned],
  ] as const;

  return (
    <Card className="shadow-none">
      <Heading className="text-xl font-semibold">{preview.roadmap.shortTitle}</Heading>
      <RoadmapUpdatedLabel updatedAt={preview.roadmap.updatedAt} />
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {groups.map(([label, items]) => (
          <div key={label}>
            <h4 className="text-sm font-semibold">{label}</h4>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{items[0]?.title ?? 'No item listed'}</p>
          </div>
        ))}
      </div>
      <Link className="mt-6 inline-block text-sm font-medium text-[var(--color-accent-primary)] underline-offset-4 hover:underline" href={href}>
        View full roadmap
      </Link>
    </Card>
  );
}
