import PublicationList from '@/components/publications/PublicationList';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getPublicationSummary } from '@/lib/content';
import { buildPageMetadata, routeMetadata } from '@/lib/seo/metadata';
import { buildCollectionPageJsonLd } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata(routeMetadata.publications);

export default function PublicationsPage() {
  const publicationSummary = getPublicationSummary();
  return (
    <div className="space-y-10 py-10 sm:py-16">
      <JsonLd data={buildCollectionPageJsonLd(routeMetadata.publications)} />
      <section aria-labelledby="publications-heading">
        <SectionHeader
          description="Peer-reviewed publications in bacterial physiology, antibiotic resistance, and retinal developmental biology."
          headingId="publications-heading"
          level={1}
          title="Publications"
        />
      </section>
      <PublicationList publications={publicationSummary.publications} />
    </div>
  );
}
