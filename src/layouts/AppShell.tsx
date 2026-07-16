import { type ReactNode } from 'react';

import { SkipLink } from '@/components/SkipLink';
import { SiteFooter } from '@/layouts/SiteFooter';
import { SiteHeader } from '@/layouts/SiteHeader';

/**
 * AppShell — the structural frame every future page mounts into (Sprint 01 §06).
 *
 * Composes the skip link, header, the `#main-content` landmark and the footer
 * into a min-height column, so the footer sits at the bottom on short pages.
 * This is the frame, not a page: it renders whatever `children` a route
 * provides and nothing more.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
