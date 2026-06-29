import type { RoadmapPreviewViewModel } from './roadmap';

export type ProductStatus = 'active' | 'in-development' | 'experimental' | 'planned' | 'paused' | 'archived';

export type ProductStage = 'foundation' | 'prototype' | 'validation';

export type ProductCategory = 'developer-tooling' | 'scientific-software' | 'website-product-lab';

export type ProductLinkKind = 'package' | 'repository' | 'documentation' | 'website';

export interface ProductLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: ProductLinkKind;
  readonly external: boolean;
}

export interface ProductModule {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly packageName?: string;
  readonly repoName?: string;
  readonly roleLabel: 'Codebase Intelligence' | 'Workflow Orchestration' | 'Validation Lab';
  readonly layerLabel: string;
  readonly summary: string;
  readonly description: string;
  readonly status: ProductStatus;
  readonly stage: ProductStage;
  readonly stack: readonly string[];
  readonly links: readonly ProductLink[];
  readonly displayPriority: number;
}

export interface ProductFamily {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly summary: string;
  readonly description: string;
  readonly status: ProductStatus;
  readonly category: ProductCategory;
  readonly positioning: string;
  readonly primaryAudience: readonly string[];
  readonly modules: readonly ProductModule[];
  readonly links: readonly ProductLink[];
  readonly featured: boolean;
  readonly displayPriority: number;
  readonly workflowSummary: string;
  readonly statusNote: string;
  readonly roadmapPlanned: boolean;
}

export interface ProductIndexItem {
  readonly id: string;
  readonly slug: string;
  readonly itemType: 'product-family' | 'standalone-product';
  readonly title: string;
  readonly summary: string;
  readonly positioning: string;
  readonly status: ProductStatus;
  readonly category: ProductCategory;
  readonly featured: boolean;
  readonly displayPriority: number;
  readonly links: readonly ProductLink[];
  readonly detailHref?: string;
  readonly roadmapSlug?: string;
}

export interface ProductCardViewModel {
  readonly item: ProductIndexItem;
  readonly roadmapPreview?: RoadmapPreviewViewModel;
}

export interface ProductIndexViewModel {
  readonly featured: readonly ProductCardViewModel[];
  readonly standard: readonly ProductCardViewModel[];
}

// Compatibility aliases for product-index placeholders owned by M6.
export type ProductModuleRecord = ProductModule;
export type ProductRecord = ProductFamily;
