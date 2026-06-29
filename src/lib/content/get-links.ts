import { siteLinks } from '@/content/links';
import type { CtaLink, NavigationLink, SiteLink } from '@/types/content';

function sortByPriority<T extends SiteLink>(links: T[]): T[] {
  return [...links].sort((a, b) => a.displayPriority - b.displayPriority);
}

function linksFor(location: SiteLink['locations'][number]): SiteLink[] {
  return sortByPriority(siteLinks.filter((link) => link.locations.includes(location)));
}

export function getPrimaryLinks(): CtaLink[] {
  return linksFor('primary') as CtaLink[];
}

export function getNavigationLinks(): NavigationLink[] {
  return linksFor('navigation') as NavigationLink[];
}

export function getFooterLinks(): SiteLink[] {
  return linksFor('footer');
}

export function getLinks(): SiteLink[] {
  return sortByPriority(siteLinks);
}
