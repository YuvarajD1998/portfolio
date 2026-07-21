import { type SpaceStep } from '@/components/layout/Stack';

/**
 * Spacer — explicit whitespace on the spacing scale (Bible §06).
 *
 * Purpose:      Insert deliberate space where a gap utility on the parent is
 *               not available (e.g. between two independent siblings).
 * Public API:   `size`, `axis`.
 * Props:        `size` (scale step), `axis`; 2 total.
 * Variants:     axis — vertical (default) | horizontal.
 * States:       None.
 * A11y:         aria-hidden — space carries no meaning to assistive tech.
 * Responsive:   Fixed token size; prefer container gaps for responsive rhythm.
 * Composition:  A leaf; renders nothing but a sized box. Whitespace is content
 *               (Bible principle 02) — this makes it explicit, not accidental.
 */
const SIZE: Record<SpaceStep, string> = {
  0: 'var(--space-1)',
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
  24: 'var(--space-24)',
};

interface SpacerProps {
  size?: SpaceStep;
  axis?: 'vertical' | 'horizontal';
}

export function Spacer({ size = 4, axis = 'vertical' }: SpacerProps) {
  const value = SIZE[size];
  return (
    <span
      aria-hidden
      style={{
        display: 'block',
        flexShrink: 0,
        width: axis === 'horizontal' ? value : undefined,
        height: axis === 'vertical' ? value : undefined,
      }}
    />
  );
}
