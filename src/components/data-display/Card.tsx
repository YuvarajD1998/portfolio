import { type ElementType } from 'react';

import { Surface, type SurfaceLevel } from '@/components/data-display/Surface';
import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Card — the generic content card (Bible §09, Sprint 02 §07).
 *
 * Purpose:      A bordered surface with card padding and optional hover lift —
 *               the base container for grouped content. Composes Surface so the
 *               layer/elevation vocabulary stays single-sourced.
 * Public API:   `level`, `interactive`, `as`, plus Surface passthrough.
 * Props:        `level`, `interactive`; ≤ 7 total.
 * Variants:     level — surface (default) | paper | sunken.
 * States:       resting (flat) → hover lift (e1) when `interactive`.
 * A11y:         Presentational by default; when the whole card is a link/button,
 *               pass `as` and the interactive semantics come from that element.
 * Responsive:   Fluid; used inside a Grid that collapses columns.
 * Composition:  Header/body/footer are just children — Card sets the frame, not
 *               a rigid slot structure. Never mixes card styles on a page.
 */
interface CardOwnProps {
  level?: SurfaceLevel;
  /** Padding step (passed to Surface). Default `md`. Use `none` to inset content. */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Add a hover lift + pointer affordance for clickable cards. */
  interactive?: boolean;
}

export function Card<E extends ElementType = 'div'>({
  as,
  level = 'surface',
  padding = 'md',
  interactive = false,
  className,
  ...rest
}: PolymorphicProps<E, CardOwnProps>) {
  return (
    <Surface
      as={(as ?? 'div') as ElementType}
      level={level}
      bordered
      padding={padding}
      className={cn(
        interactive &&
          'hover:shadow-e1 transition-shadow duration-[var(--dur-instant)] ease-[var(--ease-datum)]',
        className,
      )}
      {...rest}
    />
  );
}
