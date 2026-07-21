'use client';

import { useEffect, useState } from 'react';

/**
 * Track which section is currently in view (Sprint 03 §09, §10).
 *
 * Given an ordered list of element ids, returns the id of the section nearest
 * the top of the viewport (below the sticky header). Uses IntersectionObserver
 * with a top root-margin equal to the header height, so the "active" section is
 * the one you are actually reading, not one hidden under the header.
 *
 * Detection is passive observation — no scrolling is triggered here, so it is
 * inherently reduced-motion safe. Returns the first id until the user scrolls.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, number>();

    // IntersectionObserver rootMargin needs px/% literals — resolve the header
    // height token to px (fallback 64px = the h-16 header) once, up front.
    const headerPx =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-height',
        ),
      ) * 16 || 64;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the visible section that comes first in document order.
        const firstVisible = ids.find((id) => visible.has(id));
        if (firstVisible) setActiveId(firstVisible);
      },
      {
        // Offset the top by the header so a section counts as active once it
        // clears the bar; a bottom margin keeps one section selected.
        rootMargin: `-${headerPx}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    // On client-side navigation the incoming route's content can mount a frame
    // later than this effect (the page-transition swap), so getElementById may
    // return null on the first pass and the observer would attach to nothing —
    // leaving the rail stuck on ids[0]. Retry on rAF until every section is
    // present (or the ids change), then observe them once.
    let frame = 0;
    const attach = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length < ids.length) {
        frame = requestAnimationFrame(attach);
        return;
      }
      elements.forEach((el) => observer.observe(el));
    };
    attach();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
