import type { ProductVersionEntry } from '@/types/product';

const stateLabels: Record<ProductVersionEntry['state'], string> = {
  recent: 'Recent',
  current: 'Current',
  next: 'Next',
};

export default function RoadmapTimeline({ entries }: { entries: readonly ProductVersionEntry[] }) {
  if (!entries.length) {
    return <p className="text-sm text-[var(--color-text-muted)]">No roadmap entries listed yet.</p>;
  }

  return (
    <ol className="diagram-timeline" data-diagram-timeline>
      {entries.map((entry, index) => (
        <li
          className={'diagram-timeline-entry' + (index > 0 ? ' diagram-timeline-divider' : '')}
          data-diagram-timeline-entry={entry.version}
          data-release-state={entry.state}
          key={entry.version}
        >
          <span className="diagram-timeline-release">
            <span className="diagram-timeline-state">{stateLabels[entry.state]}</span>
            <span className="diagram-timeline-version">{entry.version}</span>
          </span>
          <span aria-hidden="true" className="diagram-timeline-marker" />
          <span className="diagram-timeline-description">{entry.description}</span>
        </li>
      ))}
    </ol>
  );
}
