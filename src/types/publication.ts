export type PublicationType =
  | 'journal-article'
  | 'conference-paper'
  | 'preprint'
  | 'thesis'
  | 'manuscript'
  | 'report'
  | 'other';

export type PublicationLinkKind = 'doi' | 'pmid' | 'publisher' | 'pdf' | 'project' | 'other';

export interface PublicationLink {
  kind: PublicationLinkKind;
  label: string;
  href: string;
}

export interface PublicationAuthor {
  name: string;
  isProfileOwner?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: PublicationAuthor[];
  year?: number;
  venue?: string;
  summary: string;
  type: PublicationType;
  links: PublicationLink[];
  tags: string[];
  displayPriority: number;
  featured?: boolean;
  doi?: string;
  pmid?: string;
}

export type PublicationCardViewModel = Publication;

export interface PublicationListViewModel {
  publications: readonly PublicationCardViewModel[];
  isEmpty: boolean;
}

export type PublicationRecord = Publication;
