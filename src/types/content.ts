export type SiteLinkKind = 'navigation' | 'cta' | 'social' | 'email' | 'download';

export interface SiteLink {
  id: string;
  label: string;
  href: string;
  kind: SiteLinkKind;
  external: boolean;
  displayPriority: number;
  locations: Array<'primary' | 'navigation' | 'footer'>;
}

export interface CtaLink extends SiteLink {
  kind: 'cta';
}

export interface NavigationLink extends SiteLink {
  kind: 'navigation';
  external: false;
}

export interface ProfileContent {
  id: 'profile';
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  locationLabel?: string;
  primaryRoleLabels: string[];
  summary: string;
  productLabStatement: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  primaryLinks: CtaLink[];
  technicalFocus: TechnicalFocusItem[];
  researchFocus: ResearchFocusItem[];
  education: EducationItem[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution?: string;
  dateLabel?: string;
  summary?: string;
}

export interface TechnicalFocusItem {
  id: string;
  title: string;
  summary: string;
}

export interface ResearchFocusItem {
  id: string;
  title: string;
  summary: string;
  areas: string[];
}

export interface AboutProfileViewModel {
  profile: ProfileContent;
  technicalFocus: readonly TechnicalFocusItem[];
  researchFocus: readonly ResearchFocusItem[];
  education: readonly EducationItem[];
}

export interface LinkRecord {
  label: string;
  href: string;
}

export type ProfileRecord = ProfileContent;
