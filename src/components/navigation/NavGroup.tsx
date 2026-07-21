import { type ReactNode } from 'react';

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
 * A11y:         Renders a `<nav>` labelled by its heading (aria-labelledby), so
 *               AT announces the group; the heading level is the caller's via
 *               semantics of the title.
 * Responsive:   Column of links; stacks in footer grids.
 * Composition:  Holds NavItem children; used in Footer / SectionNav.
 */
interface NavGroupProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function NavGroup({ title, children, className }: NavGroupProps) {
  return (
    <nav
      className={cn('flex flex-col gap-3', className)}
      aria-label={typeof title === 'string' ? title : undefined}
    >
      <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
        {title}
      </span>
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
}
