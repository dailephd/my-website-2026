import { publications } from '@/content/publications';
import type { Publication, PublicationListViewModel } from '@/types/publication';

export function isDaiLeAuthor(name: string): boolean {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized === 'dai le' || normalized === 'le dai';
}

function validatePublications(records: readonly Publication[]): void {
  const ids = new Set<string>();
  for (const publication of records) {
    if (!publication.id.trim() || !publication.title.trim()) {
      throw new Error('Publication records require an id and title.');
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
      (b.year ?? 0) - (a.year ?? 0) ||
      a.displayPriority - b.displayPriority ||
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
