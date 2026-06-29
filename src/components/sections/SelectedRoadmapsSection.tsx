import RoadmapPreview from '@/components/roadmap/RoadmapPreview';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { routes } from '@/lib/routes';
import type { HomeSectionCopy } from '@/types/home';
import type { RoadmapPreviewViewModel } from '@/types/roadmap';

export default function SelectedRoadmapsSection({ copy, preview }: {
  copy: HomeSectionCopy;
  preview?: RoadmapPreviewViewModel;
}) {
  return <section aria-labelledby="roadmap-heading" className="section-shell">
    <SectionHeader description={copy.summary} headingId="roadmap-heading" title={copy.heading} />
    {preview
      ? <RoadmapPreview headingLevel={3} href={routes.productMyDevKit} preview={preview} />
      : <Card><p className="text-[var(--color-text-secondary)]">Roadmap details are being prepared.</p></Card>}
  </section>;
}
