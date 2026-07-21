import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Section — a vertical page region with rhythmic spacing (Bible §06).
 *
 * Purpose:      Carry the between-section air (80–160px) that signals a new
 *               idea; the structural unit a page is composed from.
 * Public API:   `spacing`, `as`, standard element props.
 * Props:        `spacing` ('sm' | 'md' | 'lg'), ≤ 7 total.
 * Variants:     spacing — sm (mobile/minor) | md (default) | lg (chapter break).
 * States:       Structural; no interactive states.
 * A11y:         Renders as `section` by default; pass `as="section"` +
 *               aria-labelledby for a labelled landmark.
 * Responsive:   Padding steps up with the viewport (Bible §06 rhythm).
 * Composition:  Holds a Container; never sits inside a reading measure.
 */
export type SectionSpacing = 'sm' | 'md' | 'lg';

interface SectionOwnProps {
  spacing?: SectionSpacing;
}

const SPACING: Record<SectionSpacing, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20 lg:py-24',
  lg: 'py-20 md:py-24 lg:py-30',
};

export function Section<E extends ElementType = 'section'>({
  as,
  spacing = 'md',
  className,
  ...rest
}: PolymorphicProps<E, SectionOwnProps>) {
  const Component = (as ?? 'section') as ElementType;
  return <Component className={cn(SPACING[spacing], className)} {...rest} />;
}
