import * as RadixLabel from '@radix-ui/react-label';
import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * Label — a real form-control label (Bible §11, Sprint 02 §07).
 *
 * Purpose:      The clickable `<label>` bound to a control by `htmlFor`. This is
 *               the form label — distinct from typography/Label (a visual mono
 *               kicker), which is NOT a form label.
 * Public API:   `htmlFor`, `required`, standard label props.
 * Props:        `required`; ≤ 7 total.
 * Variants:     None — one control label.
 * States:       Static; disabled styling flows from the control via the parent.
 * A11y:         Radix Label forwards clicks to the associated control and pairs
 *               with it via `htmlFor`; `required` renders a visible marker with
 *               an accessible "(required)" note, never asterisk-only.
 * Responsive:   Inherits type; size-agnostic.
 * Composition:  Rendered by FieldWrapper; usable standalone with any control.
 */
interface LabelProps extends ComponentPropsWithoutRef<typeof RadixLabel.Root> {
  required?: boolean;
}

export function Label({ required, className, children, ...rest }: LabelProps) {
  return (
    <RadixLabel.Root
      className={cn(
        'text-ink text-small font-sans leading-snug font-medium',
        className,
      )}
      {...rest}
    >
      {children}
      {required ? (
        <span className="text-danger ml-1" aria-hidden>
          *<span className="sr-only"> (required)</span>
        </span>
      ) : null}
    </RadixLabel.Root>
  );
}
