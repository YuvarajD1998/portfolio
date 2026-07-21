import { type ComponentPropsWithoutRef } from 'react';

import { Link } from '@/components/typography';
import { cn } from '@/lib/cn';

/**
 * NavItem — a single navigation link with full states (Bible §13, Sprint 02 §05).
 *
 * Purpose:      One wayfinding link with hover / focus / current states — the
 *               atom the nav bar and mobile nav compose from. Unwired: the caller
 *               supplies `href` and `current`; no route logic lives here.
 * Public API:   `href`, `current`, `children`, plus Link props.
 * Props:        `current`; ≤ 7 total.
 * Variants:     None — one item; state is `current` + interaction pseudo-states.
 * States:       default · hover (ink) · focus (global ring) · current (Signal,
 *               underlined) — current is set by the caller, not derived here.
 * A11y:         `aria-current="page"` when current, so AT announces location;
 *               it is a real link, keyboard-operable by nature.
 * Responsive:   Size-agnostic; used in horizontal and stacked navs alike.
 * Composition:  Inside NavigationBar / MobileNav; never wires its own routing.
 */
interface NavItemProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, 'variant'> {
  /** Marks this item as the current page (caller-controlled). */
  current?: boolean;
}

export function NavItem({ current = false, className, ...rest }: NavItemProps) {
  return (
    <Link
      variant="quiet"
      aria-current={current ? 'page' : undefined}
      className={cn(
        'text-small font-sans font-medium transition-colors duration-[var(--dur-instant)]',
        current ? 'text-signal underline underline-offset-4' : 'text-graphite',
        className,
      )}
      {...rest}
    />
  );
}
