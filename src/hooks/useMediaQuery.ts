'use client';

import { useEffect, useState } from 'react';

import { type Breakpoint, minWidth } from '@/constants/breakpoints';

/**
 * Subscribe to a CSS media query, SSR-safe.
 *
 * Returns `false` during server render and the first client paint, then the
 * real match after mount — avoids a hydration mismatch. Responsive *layout*
 * should prefer CSS/Tailwind; reach for this only when behaviour (not just
 * style) must branch on width (Blueprint §08).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Convenience: matches at or above a named breakpoint. */
export function useBreakpoint(bp: Breakpoint): boolean {
  return useMediaQuery(minWidth(bp));
}
