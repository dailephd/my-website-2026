import { routes } from '@/lib/routes';
import type { CtaLink, NavigationLink, SiteLink } from '@/types/content';

export const primaryCta: CtaLink = {
  id: 'explore-projects',
  label: 'Explore technical projects',
  href: routes.projects,
  kind: 'cta',
  external: false,
  displayPriority: 10,
  locations: ['primary'],
};

export const secondaryCta: CtaLink = {
  id: 'contact-cta',
  label: 'Contact',
  href: routes.contact,
  kind: 'cta',
  external: false,
  displayPriority: 20,
  locations: ['primary'],
};

export const navigationLinks: NavigationLink[] = [
  ['home', 'Home', routes.home, 10],
  ['projects', 'Projects', routes.projects, 20],
  ['publications', 'Publications', routes.publications, 30],
  ['about', 'About', routes.about, 40],
  ['contact', 'Contact', routes.contact, 50],
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
