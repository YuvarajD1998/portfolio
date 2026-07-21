import { type ElementType } from 'react';

import { GAP, type SpaceStep } from '@/components/layout/Stack';
import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Grid — a responsive column grid (Bible §05: 12 columns · 24px gutter).
 *
 * Purpose:      Arrange children into columns that collapse gracefully across
 *               the four breakpoints (cards: 1 → 2 → 3, per Bible §14).
 * Public API:   `cols`, `gap`, `as`, standard element props.
 * Props:        `cols` ({ base, md, lg }), `gap`; ≤ 7 total.
 * Variants:     column count per breakpoint, enumerated 1–4.
 * States:       Structural; no interactive states.
 * A11y:         Transparent; no roles (a grid of cards is still a list —
 *               callers pass semantic children).
 * Responsive:   Column count set per named breakpoint (Bible §05).
 * Composition:  Holds cards/cells; gutter is the 24px token by default.
 */
type ColCount = 1 | 2 | 3 | 4;

interface GridOwnProps {
  cols?: { base?: ColCount; md?: ColCount; lg?: ColCount };
  gap?: SpaceStep;
}

const BASE_COLS: Record<ColCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};
const MD_COLS: Record<ColCount, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};
const LG_COLS: Record<ColCount, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export function Grid<E extends ElementType = 'div'>({
  as,
  cols = { base: 1, md: 2, lg: 3 },
  gap = 6,
  className,
  ...rest
}: PolymorphicProps<E, GridOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'grid',
        cols.base && BASE_COLS[cols.base],
        cols.md && MD_COLS[cols.md],
        cols.lg && LG_COLS[cols.lg],
        GAP[gap],
        className,
      )}
      {...rest}
    />
  );
}
