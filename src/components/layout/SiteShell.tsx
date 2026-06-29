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
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,var(--color-glow),transparent_68%)]" />
      <Header brandLabel={profile.name} navigationLinks={navigationLinks} />
      <main className="flex-1">
        <PageContainer>{children}</PageContainer>
      </main>
      <Footer links={footerLinks} name={profile.name} />
    </div>
  );
}
