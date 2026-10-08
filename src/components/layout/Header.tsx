import Link from 'next/link';

import NavLink from '@/components/layout/NavLink';
import SiteLogoMark from '@/components/layout/SiteLogoMark';
import AppearanceControl from '@/components/theme/AppearanceControl';
import Container from '@/components/ui/Container';
import type { NavigationLink } from '@/types/content';

export default function Header({
  brandLabel,
  navigationLinks,
}: {
  brandLabel: string;
  navigationLinks: NavigationLink[];
}) {
  return (
    <header className="theme-transition sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] backdrop-blur-xl">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3.5">
        <Link
          className="group flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight text-[var(--color-text-primary)]"
          href="/"
        >
          <SiteLogoMark decorative className="shrink-0" size={36} />
          {brandLabel}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-3">
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
              {navigationLinks.map((item) => (
                <li key={item.id}>
                  <NavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
          <AppearanceControl />
        </div>
      </Container>
    </header>
  );
}
