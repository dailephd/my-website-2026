import Link from 'next/link';

import Container from '@/components/ui/Container';
import type { SiteLink } from '@/types/content';

export default function Footer({ name, links }: { name: string; links: SiteLink[] }) {
  return (
    <footer className="theme-transition mt-10 border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] py-10">
      <Container className="flex flex-col justify-between gap-5 text-sm text-[var(--color-text-muted)] sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  className="premium-link rounded-sm hover:text-[var(--color-text-primary)] hover:underline"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
