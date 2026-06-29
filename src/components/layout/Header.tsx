import Link from 'next/link';

import ThemeToggle from '@/components/theme/ThemeToggle';
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
          className="group flex items-center gap-2 rounded-sm text-lg font-semibold tracking-tight text-[var(--color-text-primary)]"
          href="/"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-accent-violet)] shadow-[0_0_18px_var(--color-accent-violet)]" />
          {brandLabel}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-3">
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
              {navigationLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    className="premium-link rounded-sm py-2 hover:text-[var(--color-text-primary)] hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
