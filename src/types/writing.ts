export type WritingStatus = 'published' | 'draft' | 'planned' | 'archived';
export type WritingType =
  | 'note'
  | 'essay'
  | 'technical-writeup'
  | 'project-log'
  | 'research-note'
  | 'guide'
  | 'external';

export interface WritingItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: WritingStatus;
  type: WritingType;
  tags: string[];
  displayPriority: number;
  featured: boolean;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
  href?: string;
  external?: boolean;
  sourceLabel?: string;
  relatedProjectSlug?: string;
  relatedProductSlug?: string;
}

export type WritingCardViewModel = WritingItem;

export interface WritingIndexViewModel {
  items: readonly WritingCardViewModel[];
  isEmpty: boolean;
}
