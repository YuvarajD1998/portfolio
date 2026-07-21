'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * RouteAnnouncer — screen-reader route-change announcements (Sprint 03 §13).
 *
 * App Router client transitions do not reload the document, so assistive tech
 * is never told the page changed. This mounts a polite live region and, on each
 * path change (after the first paint), announces the new page's document title.
 * Focus management (moving focus to the main landmark) is handled alongside so
 * the two behaviours stay together — focus moves predictably and the change is
 * announced (S03 §13 note).
 *
 * The initial mount is skipped so the first page load is not double-announced
 * by the browser and this region.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Let the new route's metadata resolve into document.title first.
    const id = window.setTimeout(() => {
      const title = document.title;
      setMessage(title ? `Navigated to ${title}` : 'Page changed');

      // Move focus to the main landmark so keyboard users start at the content,
      // not stranded on a link from the previous page.
      const main = document.getElementById('main-content');
      if (main) {
        main.focus({ preventScroll: true });
      }
    }, 100);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      className="sr-only"
    >
      {message}
    </div>
  );
}
