import type { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageContainer from '@/components/layout/PageContainer';
import { getFooterLinks, getNavigationLinks, getProfile } from '@/lib/content';

export default function SiteShell({ children }: { children: ReactNode }) {
  const profile = getProfile();
  const navigationLinks = getNavigationLinks();
  const footerLinks = getFooterLinks();

  return (
    <div className="theme-transition relative flex min-h-screen flex-col overflow-clip bg-transparent text-[var(--color-text-primary)]">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-control)] focus:bg-[var(--color-elevated)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-text-primary)] focus:shadow-[var(--shadow-control)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus-ring)]"
        href="#main-content"
      >
        Skip to main content
      </a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,var(--color-glow),transparent_68%)]" />
      <Header brandLabel={profile.business?.name ?? profile.name} navigationLinks={navigationLinks} />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <PageContainer>{children}</PageContainer>
      </main>
      <Footer links={footerLinks} name={profile.business?.name ?? profile.name} />
    </div>
  );
}
