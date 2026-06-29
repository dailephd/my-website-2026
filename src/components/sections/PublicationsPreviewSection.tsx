import Link from 'next/link';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { routes } from '@/lib/routes';
import type { HomeSectionCopy } from '@/types/home';
import type { PublicationListViewModel } from '@/types/publication';

export default function PublicationsPreviewSection({
  copy,
  summary,
}: {
  copy: HomeSectionCopy;
  summary: PublicationListViewModel;
}) {
  return <section aria-labelledby="research-heading" className="section-shell">
    <SectionHeader description={copy.summary} headingId="research-heading" title={copy.heading} />
    <Card className="bg-[var(--color-elevated)]">
      <p className="max-w-3xl text-[var(--color-text-secondary)]">
        {summary.isEmpty
          ? 'Research training and scientific software experience support an evidence-aware engineering practice. Verified citation details will appear only after they are confirmed in local content.'
          : `${summary.publications.length} verified publication record${summary.publications.length === 1 ? '' : 's'} available.`}
      </p>
      <Link className="premium-link mt-5 inline-block font-medium text-[var(--color-accent-cyan)] hover:underline" href={routes.about}>
        About Dai&apos;s background
      </Link>
    </Card>
  </section>;
}
