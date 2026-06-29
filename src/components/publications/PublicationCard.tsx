import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { Publication } from '@/types/publication';

const typeLabels: Record<Publication['type'], string> = {
  'journal-article': 'Journal article',
  'conference-paper': 'Conference paper',
  preprint: 'Preprint',
  thesis: 'Thesis',
  manuscript: 'Manuscript',
  report: 'Report',
  other: 'Publication',
};

export default function PublicationCard({ publication }: { publication: Publication }) {
  const citationDetails = [publication.venue, publication.year].filter(Boolean).join(' · ');

  return (
    <Card as="article" className="premium-card-interactive h-full">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{typeLabels[publication.type]}</Badge>
        {publication.featured ? <Badge>Featured</Badge> : null}
      </div>
      <h3 className="mt-4 break-words text-xl font-semibold tracking-tight">{publication.title}</h3>
      {publication.authors.length > 0 ? (
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {publication.authors.map(({ name }) => name).join(', ')}
        </p>
      ) : null}
      {citationDetails ? <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{citationDetails}</p> : null}
      <p className="mt-4 text-[var(--color-text-secondary)]">{publication.summary}</p>
      {publication.tags.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Research areas">
          {publication.tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}
        </ul>
      ) : null}
      {publication.links.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-4" aria-label="Publication links">
          {publication.links.map((link) => (
            <li key={`${link.kind}-${link.href}`}>
              <a className="font-medium text-[var(--color-accent-cyan)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]" href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
