import { type ReactNode } from 'react';

import { ScrollToTop, SkipNavigation } from '@/components/utility';
import { PageTransitions } from '@/layouts/PageTransitions';
import { RouteAnnouncer } from '@/layouts/RouteAnnouncer';
import { SiteFooter } from '@/layouts/SiteFooter';
import { SiteHeader } from '@/layouts/SiteHeader';

/**
 * AppShell — the structural frame every route mounts into (Sprint 03 §04).
 *
 * Composes, in landmark order: the skip link (first tab stop), the header, the
 * `#main-content` landmark, the footer, plus two cross-cutting helpers — the
 * scroll-to-top affordance and the route-change announcer. It is a min-height
 * column so the footer sits at the bottom on short pages. This is the frame,
 * not a page: it renders whatever `children` a route provides and nothing more,
 * so error and loading surfaces render inside the shell (S03 §12 RULE).
 *
 * The route content is wrapped in `PageTransitions` (S13 §05) so navigating
 * between pages plays the approved cross-fade — never gating the click, always
 * collapsing to instant under reduced motion.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <SkipNavigation />
      <SiteHeader />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        <PageTransitions>{children}</PageTransitions>
      </main>
      <SiteFooter />
      <ScrollToTop />
      <RouteAnnouncer />
    </div>
  );
}
