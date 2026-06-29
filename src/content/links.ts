import { routes } from '@/lib/routes';
import type { CtaLink, NavigationLink, SiteLink } from '@/types/content';

export const primaryCta: CtaLink = {
  id: 'view-work',
  label: 'View selected work',
  href: routes.work,
  kind: 'cta',
  external: false,
  displayPriority: 10,
  locations: ['primary'],
};

export const secondaryCta: CtaLink = {
  id: 'explore-products',
  label: 'Explore the product lab',
  href: routes.products,
  kind: 'cta',
  external: false,
  displayPriority: 20,
  locations: ['primary'],
};

export const navigationLinks: NavigationLink[] = [
  ['home', 'Home', routes.home, 10],
  ['work', 'Work', routes.work, 20],
  ['products', 'Products', routes.products, 30],
  ['writing', 'Writing', routes.writing, 40],
  ['about', 'About', routes.about, 50],
  ['contact', 'Contact', routes.contact, 60],
].map(([id, label, href, displayPriority]) => ({
  id: String(id),
  label: String(label),
  href: String(href),
  kind: 'navigation',
  external: false,
  displayPriority: Number(displayPriority),
  locations: ['navigation', 'footer'],
}));

export const siteLinks: SiteLink[] = [
  primaryCta,
  secondaryCta,
  ...navigationLinks,
];

// Compatibility export for placeholder components pending their milestone implementation.
export const externalLinks = siteLinks.filter((link) => link.external);
