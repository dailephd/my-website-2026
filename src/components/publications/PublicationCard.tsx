import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { isDaiLeAuthor } from '@/lib/content';
import type { Publication } from '@/types/publication';

export default function PublicationCard({ publication }: { publication: Publication }) {
  const venueParts = [
    publication.journal ?? publication.venue,
    publication.volume != null ? String(publication.volume) : null,
    publication.issue != null ? `(${publication.issue})` : null,
    publication.pages ?? publication.articleNumber ?? null,
    publication.year != null ? `(${publication.year})` : null,
  ].filter(Boolean);
  const venueLabel = venueParts.join(' ');
  const doiUrl = publication.url ?? (publication.doi ? `https://doi.org/${publication.doi}` : null);
  const doiLabel = publication.doi ? `doi:${publication.doi}` : null;

  return (
    <Card as="article" className="premium-card-interactive">
      {doiUrl ? (
        <a
          className="group block break-words text-xl font-semibold tracking-tight hover:text-[var(--color-accent-primary-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          href={doiUrl}
          rel="noreferrer"
          target="_blank"
        >
          <h3 className="text-xl font-semibold tracking-tight">{publication.title}</h3>
        </a>
      ) : (
        <h3 className="break-words text-xl font-semibold tracking-tight">{publication.title}</h3>
      )}

      {publication.authors.length > 0 ? (
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {publication.authors
            .map(({ name, isProfileOwner }) =>
              isProfileOwner || isDaiLeAuthor(name) ? (
                <strong key={name} className="font-semibold text-[var(--color-text-primary)]">
                  {name}
                </strong>
              ) : (
                name
              ),
            )
            .reduce<React.ReactNode[]>((acc, item, i) => {
              if (i === 0) return [item];
              return [...acc, ', ', item];
            }, [])}
        </p>
      ) : null}

      {venueLabel ? (
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{venueLabel}</p>
      ) : null}

      {doiLabel && doiUrl ? (
        <p className="mt-2 text-sm">
          <a
            className="text-[var(--color-accent-primary-text)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            href={doiUrl}
            rel="noreferrer"
            target="_blank"
          >
            {doiLabel}
          </a>
        </p>
      ) : null}

      {publication.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Research areas">
          {publication.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <details className="mt-5 group/abstract">
        <summary className="cursor-pointer list-none text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] [&::-webkit-details-marker]:hidden">
          <span className="select-none">Abstract</span>
        </summary>
        {publication.abstract ? (
          publication.abstract.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Abstract unavailable.</p>
        )}
      </details>

      {publication.bibtex ? (
        <details className="mt-3">
          <summary className="cursor-pointer list-none text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] [&::-webkit-details-marker]:hidden">
            <span className="select-none">BibTeX</span>
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-[var(--radius-sm)] bg-[var(--color-surface-elevated)] p-3 text-xs leading-relaxed whitespace-pre-wrap break-all">
            <code>{publication.bibtex}</code>
          </pre>
        </details>
      ) : null}
    </Card>
  );
}
