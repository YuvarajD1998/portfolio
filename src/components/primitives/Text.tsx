import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Text — body, caption and mono-label copy on the type scale (Bible §04).
 *
 * Purpose:      Render running text at a scale step with the right family,
 *               colour tier and rhythm — the workhorse text primitive.
 * Public API:   `variant`, `tone`, `as`, standard element props.
 * Props:        `variant`, `tone`, `as`; ≤ 7 total.
 * Variants:     variant — body | small | label (mono, uppercase, tracked) | code.
 *               tone — ink | graphite | mute | signal.
 * States:       Static text; no interactive states.
 * A11y:         `label` is a visual kicker, not a form label; use <label> for
 *               fields. Colour never carries meaning alone (Bible §11).
 * Responsive:   Body never drops below 16px (Bible §04); label stays mono.
 * Composition:  Pairs with Heading; caps its own measure via a Container.
 */
export type TextVariant = 'body' | 'small' | 'label' | 'code';
export type TextTone = 'ink' | 'graphite' | 'mute' | 'signal';

interface TextOwnProps {
  variant?: TextVariant;
  tone?: TextTone;
}

const VARIANT: Record<TextVariant, string> = {
  body: 'font-sans text-body font-normal leading-[1.6]',
  small: 'font-sans text-small font-normal leading-[1.5]',
  label:
    'font-mono text-label font-medium uppercase leading-[1.4] tracking-[0.14em]',
  code: 'font-mono text-code font-normal leading-[1.6]',
};

const TONE: Record<TextTone, string> = {
  ink: 'text-ink',
  graphite: 'text-graphite',
  mute: 'text-mute',
  signal: 'text-signal',
};

/** Default semantic element per variant (label → span, code → code). */
const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  body: 'p',
  small: 'p',
  label: 'span',
  code: 'code',
};

export function Text<E extends ElementType = 'p'>({
  as,
  variant = 'body',
  tone = 'graphite',
  className,
  ...rest
}: PolymorphicProps<E, TextOwnProps>) {
  const Component = (as ?? DEFAULT_TAG[variant]) as ElementType;
  return (
    <Component
      className={cn('text-pretty', VARIANT[variant], TONE[tone], className)}
      {...rest}
    />
  );
}
