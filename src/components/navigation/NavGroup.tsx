import { type ReactNode, useId } from 'react';

import { cn } from '@/lib/cn';

/**
 * NavGroup — a titled cluster of nav links (Bible §09 Footer, Sprint 02 §05).
 *
 * Purpose:      Group related links under a heading — a footer column or a
 *               sidebar section.
 * Public API:   `title`, `children`, `className`.
 * Props:        `title`; ≤ 7 total.
 * Variants:     None.
 * States:       Static container; its NavItem children carry the states.
 * A11y:         A titled group of links, NOT its own `<nav>` landmark — the
 *               footer is already a landmark and each column being a separate
 *               `<nav>` would flood the AT landmark menu (S15 §02, SC 1.3.1).
 *               The list is labelled by the visible column title via
 *               `aria-labelledby`, so AT still announces the group; the caller
 *               wraps the whole set of columns in one labelled `<nav>`.
 * Responsive:   Column of links; stacks in footer grids.
 * Composition:  Holds NavItem children; used in Footer / SectionNav.
 */
interface NavGroupProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function NavGroup({ title, children, className }: NavGroupProps) {
  // A stable, hydration-safe id so the list is programmatically labelled by its
  // visible title (SC 1.3.1) without adding a redundant landmark.
  const titleId = useId();
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <span
        id={titleId}
        className="text-mute text-label font-mono tracking-[0.14em] uppercase"
      >
        {title}
      </span>
      <ul className="flex flex-col gap-2" aria-labelledby={titleId}>
        {children}
      </ul>
    </div>
  );
}
