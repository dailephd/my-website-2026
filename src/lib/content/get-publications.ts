import { publications } from '@/content/publications';
import type { Publication, PublicationListViewModel } from '@/types/publication';

function validatePublications(records: readonly Publication[]): void {
  const ids = new Set<string>();
  for (const publication of records) {
    if (!publication.id.trim() || !publication.title.trim() || !publication.summary.trim()) {
      throw new Error('Publication records require an id, title, and summary.');
    }
    if (publication.authors.length === 0) {
      throw new Error(`Publication "${publication.id}" requires at least one verified author.`);
    }
    if (ids.has(publication.id)) {
      throw new Error(`Duplicate publication id: ${publication.id}`);
    }
    ids.add(publication.id);
  }
}

function sorted(records: readonly Publication[]): Publication[] {
  validatePublications(records);
  return [...records].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      a.displayPriority - b.displayPriority ||
      (b.year ?? 0) - (a.year ?? 0) ||
      a.title.localeCompare(b.title),
  );
}

export function getAllPublications(): Publication[] {
  return sorted(publications);
}

export const getPublications = getAllPublications;

export function getFeaturedPublications(): Publication[] {
  return getAllPublications().filter((publication) => publication.featured);
}

export function getPublicationById(id: string): Publication | undefined {
  return getAllPublications().find((publication) => publication.id === id);
}

export function getPublicationCards(): Publication[] {
  return getAllPublications();
}

export function getPublicationSummary(): PublicationListViewModel {
  const records = getAllPublications();
  return { publications: records, isEmpty: records.length === 0 };
}

export { validatePublications };
