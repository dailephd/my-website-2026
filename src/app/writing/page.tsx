import WritingCard from '@/components/writing/WritingCard';
import WritingEmptyState from '@/components/writing/WritingEmptyState';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getContactChannels, getWritingIndex } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';
import { buildCollectionPageJsonLd } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata(routeMetadata.writing);

export default function WritingPage() {
  const index = getWritingIndex();
  const pathways = getContactChannels();
  return (
    <div className="space-y-10 py-10 sm:py-16">
      <JsonLd data={buildCollectionPageJsonLd(routeMetadata.writing)} />
      <section aria-labelledby="writing-heading">
        <SectionHeader
          description="Technical notes, project logs, and research-informed observations, published when they are ready."
          headingId="writing-heading"
          level={1}
          title="Writing"
        />
      </section>
      {index.isEmpty ? (
        <WritingEmptyState pathways={pathways} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {index.items.map((item) => <WritingCard item={item} key={item.id} />)}
        </div>
      )}
    </div>
  );
}
