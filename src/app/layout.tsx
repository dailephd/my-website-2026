import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/app/globals.css';
import SiteShell from '@/components/layout/SiteShell';
import ThemeProvider from '@/components/theme/ThemeProvider';
import ThemeScript from '@/components/theme/theme-script';
import JsonLd from '@/components/seo/JsonLd';
import { getSiteMetadata } from '@/lib/seo/metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { buildPersonJsonLd, buildWebSiteJsonLd } from '@/lib/seo/structured-data';

const site = getSiteMetadata();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <JsonLd data={buildPersonJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
      </head>
      <body>
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
