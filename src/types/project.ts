export type ProjectStatus =
  | 'active'
  | 'in-development'
  | 'maintained'
  | 'experimental'
  | 'archived'
  | 'planned';

export type ProjectCategory =
  | 'developer-tooling'
  | 'scientific-software'
  | 'website-product-lab';

export type ProjectLinkKind = 'repository' | 'package' | 'documentation' | 'website';

export interface ProjectLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: ProjectLinkKind;
  readonly external: boolean;
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly longSummary?: string;
  readonly notes?: string;
  readonly status: ProjectStatus;
  readonly category: ProjectCategory;
  readonly focusLabel?: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly featured: boolean;
  readonly displayPriority: number;
  readonly links: readonly ProjectLink[];
}

export type FeaturedProject = Project & { readonly featured: true };

// Compatibility alias for scaffold imports while M3 consumers move to Project.
export type ProjectRecord = Project;
