/**
 * Named breakpoints (Design Bible §05, §15).
 *
 * These are the ONLY widths the responsive system recognises. Components
 * respond within them, never around them. Values mirror the `--bp-*` tokens.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 960,
  lg: 1280,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** `min-width` media query string for a named breakpoint. */
export function minWidth(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`;
}
