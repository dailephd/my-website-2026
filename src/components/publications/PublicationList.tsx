import type { Publication } from '@/types/publication';
import PublicationCard from './PublicationCard';

export default function PublicationList({ publications }: { publications: readonly Publication[] }) {
  if (publications.length === 0) {
    return (
      <div className="rounded-[var(--radius-panel)] border border-dashed border-[var(--color-border)] p-7 sm:p-9">
        <h3 className="text-lg font-semibold">Publication record in preparation</h3>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]">
          Verified citation details are not yet available in this site&apos;s local content.
          Research background is presented without publishing uncertain titles, venues, or identifiers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
