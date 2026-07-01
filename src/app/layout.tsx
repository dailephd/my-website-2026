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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icons/dl-favicon-light.svg', type: 'image/svg+xml' },
      {
        url: '/icons/dl-favicon-dark.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
