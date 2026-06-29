import type { CtaLink, SiteLink, ProfileContent } from './content';
import type { ProductCardViewModel, ProductFamily } from './product';
import type { Project } from './project';
import type { RoadmapPreviewViewModel } from './roadmap';
import type { PublicationListViewModel } from './publication';

export interface HomeSectionCopy {
  readonly eyebrow?: string;
  readonly heading: string;
  readonly summary: string;
}

export interface TechnicalFocusItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

export interface HomepageContent {
  readonly hero: HomeSectionCopy;
  readonly featuredWork: HomeSectionCopy;
  readonly productLab: HomeSectionCopy;
  readonly roadmaps: HomeSectionCopy;
  readonly technicalFocus: HomeSectionCopy & {
    readonly items: readonly TechnicalFocusItem[];
  };
  readonly credibility: HomeSectionCopy;
  readonly contact: HomeSectionCopy;
}

export interface HomepageViewModel {
  readonly copy: HomepageContent;
  readonly profile: ProfileContent;
  readonly heroLinks: readonly CtaLink[];
  readonly featuredProjects: readonly Project[];
  readonly featuredProducts: readonly ProductCardViewModel[];
  readonly ecosystem: ProductFamily;
  readonly roadmapPreview?: RoadmapPreviewViewModel;
  readonly contactLinks: readonly SiteLink[];
  readonly publicationSummary: PublicationListViewModel;
}
