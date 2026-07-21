import { AlertCircle } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * ValidationMessage — an inline field error (Bible §11, Sprint 02 §07).
 *
 * Purpose:      Show a validation error beneath a control, carried by an icon
 *               AND text so the error is never colour-only.
 * Public API:   standard `<p>` props (`id` set by FieldWrapper).
 * Props:        `className`, children; ≤ 7 total.
 * Variants:     None — error tone only (success/warning use Alert if needed).
 * States:       Rendered only when the field is invalid.
 * A11y:         `role="alert"` so AT announces it on appearance; its `id` is
 *               referenced by the control's `aria-describedby`, and the control
 *               carries `aria-invalid` (FieldWrapper wires both).
 * Responsive:   Inherits small type.
 * Composition:  Provided as `error` to FieldWrapper; rarely used directly.
 */
export function ValidationMessage({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      role="alert"
      className={cn(
        'text-danger text-small flex items-center gap-1.5 leading-[1.5]',
        className,
      )}
      {...rest}
    >
      <Icon icon={AlertCircle} size="sm" />
      <span>{children}</span>
    </p>
  );
}
