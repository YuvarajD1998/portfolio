'use client';

import { useEffect, useState } from 'react';

/**
 * Track which section is currently in view (Sprint 03 §09, §10).
 *
 * Given an ordered list of element ids, returns the id of the section nearest
 * the top of the viewport (below the sticky header) — the one you are actually
 * reading, not one hidden under the header.
 *
 * Detection is a direct scroll-position measurement rather than an
 * IntersectionObserver: the active section is recomputed on every scroll and
 * once after mount. An observer is edge-triggered — it only re-fires when
 * intersection changes — so on client-side navigation its first callback runs
 * against mid-transition geometry (the page-transition + Reveal entrance still
 * settling) and then never re-fires without a scroll, leaving the rail stuck.
 * Measuring positions directly is deterministic and behaves identically on a
 * fresh load and on navigation. No scrolling is triggered here, so it stays
 * reduced-motion safe. Returns the first id until the reader scrolls.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    if (ids.length === 0) return;

    // Resolve the sticky-header height once so a section counts as "current"
    // the moment it clears the bar. --header-height is a rem value; convert to
    // px against the root font size (fallback 64px = the h-16 header).
    const rootFontPx =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const headerRem = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height',
      ),
    );
    const headerPx = Number.isFinite(headerRem) ? headerRem * rootFontPx : 64;

    // The line below the header where "current" is measured; a small extra
    // offset means a section activates just as its heading reaches the bar.
    const activationLine = headerPx + 8;

    const computeActive = () => {
      // The active section is the last one whose top has scrolled above the
      // activation line — i.e. the one currently under the reader's eye.
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= activationLine) {
          current = id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    // Recompute on scroll and on resize (section offsets move when the layout
    // reflows). Passive listener — never blocks scrolling.
    const onScroll = () => computeActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Evaluate once after the incoming route has settled. On navigation the
    // page-transition + Reveal entrance animate for a couple of frames after
    // mount, so a single synchronous read would measure mid-animation offsets;
    // a double rAF lets layout settle before the first measurement.
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(computeActive);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return activeId;
}
