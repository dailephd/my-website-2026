import LinkButton from '@/components/ui/LinkButton';
import Card from '@/components/ui/Card';
import type { ContactChannel } from '@/types/contact';

export default function WritingEmptyState({ pathways }: { pathways: readonly ContactChannel[] }) {
  return (
    <Card className="hero-backdrop border-dashed p-7 sm:p-9">
      <h2 className="text-xl font-semibold">Publications are in preparation</h2>
      <p className="mt-3 max-w-3xl text-[var(--color-text-secondary)]">
        Technical notes, research observations, and project logs will appear here only
        after real entries are ready for publication.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {pathways.slice(0, 2).map((channel) => (
          <LinkButton external={channel.external} href={channel.href} key={channel.id} label={channel.label} />
        ))}
      </div>
    </Card>
  );
}
