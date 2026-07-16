import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Surface — a token-driven background layer (Bible §03, §07).
 *
 * Purpose:      Render the paper/surface/sunken layers with the shared card
 *               anatomy — hairline border, tight radius, flat by default.
 * Public API:   `level`, `bordered`, `padding`, `elevation`, `as`.
 * Props:        `level`, `bordered`, `padding`, `elevation`; ≤ 7 total.
 * Variants:     level — paper | surface | sunken. elevation — e0…e3.
 * States:       Static container; interactive surfaces add their own states.
 * A11y:         Transparent; renders semantic `as`.
 * Responsive:   Size-agnostic; padding is a token step.
 * Composition:  The base every card/panel builds on. Never mixes card styles
 *               on one page (Bible §09) — elevation stays at e0 for resting.
 */
export type SurfaceLevel = 'paper' | 'surface' | 'sunken';
type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';
type Elevation = 'e0' | 'e1' | 'e2' | 'e3';

interface SurfaceOwnProps {
  level?: SurfaceLevel;
  bordered?: boolean;
  padding?: SurfacePadding;
  elevation?: Elevation;
}

const LEVEL: Record<SurfaceLevel, string> = {
  paper: 'bg-paper',
  surface: 'bg-surface',
  sunken: 'bg-sunken',
};

const PADDING: Record<SurfacePadding, string> = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-8',
};

const ELEVATION: Record<Elevation, string> = {
  e0: 'shadow-e0',
  e1: 'shadow-e1',
  e2: 'shadow-e2',
  e3: 'shadow-e3',
};

export function Surface<E extends ElementType = 'div'>({
  as,
  level = 'surface',
  bordered = true,
  padding = 'md',
  elevation = 'e0',
  className,
  ...rest
}: PolymorphicProps<E, SurfaceOwnProps>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component
      className={cn(
        'rounded-sm',
        LEVEL[level],
        bordered && 'border-hairline border',
        PADDING[padding],
        ELEVATION[elevation],
        className,
      )}
      {...rest}
    />
  );
}
