import { type Metadata, type Viewport } from 'next';

import { AppShell } from '@/layouts/AppShell';
import { defaultMetadata } from '@/lib/seo';
import { personJsonLd, serializeJsonLd } from '@/lib/structured-data';
import { Providers } from '@/providers';
import { fontVariables } from '@/theme/fonts';
import { themeScript } from '@/theme/theme-script';

import '@/styles/globals.css';

/**
 * Root layout — the layer under everything (Sprint 03 §03).
 *
 * Wires the fonts (zero layout shift), the pre-hydration theme script (no FOUC),
 * global providers, the application shell and the shared Person JSON-LD. It is
 * the frame every route mounts into and renders no page content itself; per-route
 * `metadata`/`generateMetadata` override the defaults set here.
 */

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Theme colour follows the paper/ink field per scheme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F4' },
    { media: '(prefers-color-scheme: dark)', color: '#121110' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Runs before first paint so the correct theme is set with no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(personJsonLd()),
          }}
        />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
