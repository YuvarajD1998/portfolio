/**
 * Active-path matching (Sprint 03 §05, §06).
 *
 * The rule the header and any nav use to decide whether a link is "current":
 * the home link matches only the exact root; every other link matches its own
 * path and any nested path below it (so `/projects/transpahire` keeps the
 * `/projects` → "Work" item current). Pure and framework-agnostic so it is
 * unit-testable without a router.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
