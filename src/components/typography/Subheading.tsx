import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Subheading — the supporting line beneath a headline (Bible §04).
 *
 * Purpose:      Render the larger-than-body standfirst / deck that introduces a
 *               section under its Heading — graphite, relaxed, on the measure.
 * Public API:   `tone`, `as`, standard element props.
 * Props:        `tone`, `as`; ≤ 7 total.
 * Variants:     tone — graphite (default) | mute | ink.
 * States:       Static text; no interactive states.
 * A11y:         A `p` by default; it is a deck, not a heading — do not use `as`
 *               to fake a heading level.
 * Responsive:   Caps its own measure via a Container/ContentWrapper.
 * Composition:  Sits directly under Display/Heading; Text carries body below.
 */
type SubheadingTone = 'graphite' | 'mute' | 'ink';

interface SubheadingOwnProps {
  tone?: SubheadingTone;
}

const TONE: Record<SubheadingTone, string> = {
  graphite: 'text-graphite',
  mute: 'text-mute',
  ink: 'text-ink',
};

export function Subheading<E extends ElementType = 'p'>({
  as,
  tone = 'graphite',
  className,
  ...rest
}: PolymorphicProps<E, SubheadingOwnProps>) {
  const Component = (as ?? 'p') as ElementType;
  return (
    <Component
      className={cn(
        'text-h3 font-sans leading-[1.5] font-normal text-pretty',
        TONE[tone],
        className,
      )}
      {...rest}
    />
  );
}
