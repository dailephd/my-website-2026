import Card from '@/components/ui/Card';
import type { Publication } from '@/types/publication';
import PublicationCard from './PublicationCard';

export default function PublicationList({ publications }: { publications: readonly Publication[] }) {
  if (publications.length === 0) {
    return (
      <Card className="hero-backdrop border-dashed p-7 sm:p-9">
        <h3 className="text-lg font-semibold">Publication record in preparation</h3>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">
          Verified citation details are not yet available in this site&apos;s local content.
          Research background is presented without publishing uncertain titles, venues, or identifiers.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
