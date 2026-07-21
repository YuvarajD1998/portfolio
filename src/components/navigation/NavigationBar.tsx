import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * NavigationBar — a horizontal row of nav links (Bible §09, Sprint 02 §05).
 *
 * Purpose:      Lay NavItem children in a horizontal, keyboard-navigable list —
 *               the desktop primary nav. Unwired: it arranges items, no routing.
 * Public API:   `label`, `children`, `className`.
 * Props:        `label`; ≤ 7 total.
 * Variants:     None.
 * States:       Static container; NavItem children carry interaction states.
 * A11y:         Renders `<nav aria-label>` with a `<ul>` of items, so AT
 *               announces a labelled navigation landmark and item count.
 * Responsive:   Horizontal on desktop; the caller swaps to MobileNav below md.
 * Composition:  Holds NavItem children; sits inside Header.
 */
interface NavigationBarProps {
  /** Accessible name for the navigation landmark, e.g. "Primary". */
  label: string;
  children: ReactNode;
  className?: string;
}

export function NavigationBar({
  label,
  children,
  className,
}: NavigationBarProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className={cn('flex items-center gap-6')}>{children}</ul>
    </nav>
  );
}
