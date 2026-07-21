import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * HelperText — supplementary guidance under a field (Bible §11, Sprint 02 §07).
 *
 * Purpose:      Render the calm hint tying to a control via `aria-describedby`
 *               (FieldWrapper wires the id).
 * Public API:   standard `<p>` props (`id` set by FieldWrapper).
 * Props:        `className`, children; ≤ 7 total.
 * Variants:     None.
 * States:       Static; hidden by FieldWrapper when a validation message shows.
 * A11y:         Its `id` is referenced by the control's `aria-describedby`, so
 *               AT reads the hint with the field.
 * Responsive:   Inherits small type.
 * Composition:  Provided as `helperText` to FieldWrapper; rarely used directly.
 */
export function HelperText({
  className,
  ...rest
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn('text-mute text-small leading-[1.5]', className)}
      {...rest}
    />
  );
}
