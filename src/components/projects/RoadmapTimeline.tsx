import type { ProductVersionEntry } from '@/types/product';

export default function RoadmapTimeline({ entries }: { entries: readonly ProductVersionEntry[] }) {
  if (!entries.length) {
    return <p className="text-sm text-[var(--color-text-muted)]">No roadmap entries listed yet.</p>;
  }

  return (
    <ol className="divide-y divide-[var(--color-border)]">
      {entries.map((entry) => (
        <li
          className="grid grid-cols-[4.5rem_auto_1fr] items-start gap-x-3 py-2.5 first:pt-0 last:pb-0"
          key={entry.version}
        >
          <span className="pt-0.5 text-sm font-semibold text-[var(--color-accent-cyan)]">{entry.version}</span>
          <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-violet)]" />
          <span className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{entry.description}</span>
        </li>
      ))}
    </ol>
  );
}
