import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { WritingItem } from '@/types/writing';

const typeLabels: Record<WritingItem['type'], string> = {
  note: 'Note',
  essay: 'Essay',
  'technical-writeup': 'Technical writeup',
  'project-log': 'Project log',
  'research-note': 'Research note',
  guide: 'Guide',
  external: 'External writing',
};

export default function WritingCard({ item }: { item: WritingItem }) {
  const date = item.publishedAt ?? item.updatedAt;
  return (
    <Card as="article" className="premium-card-interactive flex h-full flex-col">
      <div className="flex flex-wrap gap-2">
        <Badge>{typeLabels[item.type]}</Badge>
        <Badge>{item.status === 'published' ? 'Published' : 'External'}</Badge>
      </div>
      <h2 className="mt-4 break-words text-xl font-semibold">{item.title}</h2>
      <p className="mt-3 flex-1 text-[var(--color-text-secondary)]">{item.summary}</p>
      {date || item.readingTime || item.sourceLabel ? (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          {[date, item.readingTime, item.sourceLabel].filter(Boolean).join(' · ')}
        </p>
      ) : null}
      {item.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Writing topics">
          {item.tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}
        </ul>
      ) : null}
      {item.href ? (
        <a
          className="mt-5 font-medium text-[var(--color-accent-primary-text)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
          href={item.href}
          rel={item.external ? 'noreferrer' : undefined}
          target={item.external ? '_blank' : undefined}
        >
          Read {item.sourceLabel ?? item.title}
        </a>
      ) : null}
    </Card>
  );
}
