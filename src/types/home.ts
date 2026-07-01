import type { CtaLink, ProfileContent } from './content';
import type { ProductCardViewModel } from './product';

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

export interface BackgroundCardCta {
  readonly label: string;
  readonly href: string;
}

export interface BackgroundCard {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly supportingText: string;
  readonly cta: BackgroundCardCta;
}

export interface HomepageContent {
  readonly hero: HomeSectionCopy;
  readonly featuredWork: HomeSectionCopy;
  readonly technicalFocus: HomeSectionCopy & {
    readonly items: readonly TechnicalFocusItem[];
  };
  readonly background: HomeSectionCopy & {
    readonly cards: readonly BackgroundCard[];
  };
}

export interface HomepageViewModel {
  readonly copy: HomepageContent;
  readonly profile: ProfileContent;
  readonly heroLinks: readonly CtaLink[];
  readonly featuredProducts: readonly ProductCardViewModel[];
}
