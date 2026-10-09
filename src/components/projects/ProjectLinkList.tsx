import Link from 'next/link';

import type { ProjectLink } from '@/types/project';

export default function ProjectLinkList({ links }: { links: readonly ProjectLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Project links" className="flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            className="rounded-sm text-sm font-medium text-[var(--color-accent-primary-text)] underline decoration-transparent underline-offset-4 hover:decoration-current"
            href={link.href}
            rel={link.external ? 'noreferrer' : undefined}
            target={link.external ? '_blank' : undefined}
          >
            {link.label}
            {link.external ? <span aria-hidden="true"> ↗</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
