export type GalleryItemKind =
  | 'project-screenshot'
  | 'product-screenshot'
  | 'profile'
  | 'diagram'
  | 'visual';

export type GalleryCategory =
  | 'selected-work'
  | 'product-lab'
  | 'my-dev-kit'
  | 'about'
  | 'profile'
  | 'general';

export type GalleryPlacement = 'work' | 'products' | 'my-dev-kit' | 'about' | 'homepage';
export type GalleryLinkKind = 'project' | 'product' | 'source' | 'external';

export interface GalleryLink {
  kind: GalleryLinkKind;
  label: string;
  href: string;
  external: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  kind: GalleryItemKind;
  category: GalleryCategory;
  caption: string;
  width: number;
  height: number;
  displayPriority: number;
  featured: boolean;
  decorative?: boolean;
  projectSlug?: string;
  productSlug?: string;
  pagePlacement?: GalleryPlacement[];
  credit?: string;
  dateLabel?: string;
  tags?: string[];
  link?: GalleryLink;
  thumbnailSrc?: string;
}

export type MediaCardViewModel = GalleryItem;

export interface GallerySectionViewModel {
  items: readonly MediaCardViewModel[];
  isEmpty: boolean;
}
