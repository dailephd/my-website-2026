export const contactContent = {
  heading: 'Contact',
  intro:
    'For project inquiries, custom computing services, AI/data workflows, scientific computing, or technical collaboration, send a message below.',
} as const;

export const profileLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/dailephd',
    kind: 'linkedin' as const,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/dailephd',
    kind: 'github' as const,
    external: true,
  },
] as const;
