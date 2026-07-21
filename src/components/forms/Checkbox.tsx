'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Checkbox — a labelled boolean/tri-state checkbox (Bible §13, Sprint 02 §07).
 *
 * Purpose:      A single checkbox with its inline label, on Radix Checkbox for
 *               state and keyboard behaviour.
 * Public API:   `label`, plus Radix Checkbox props (checked, defaultChecked,
 *               onCheckedChange, disabled, required, name, value).
 * Props:        Typed; ≤ 7 conceptual.
 * Variants:     None; supports the `indeterminate` state via `checked="indeterminate"`.
 * States:       unchecked · checked · indeterminate · focus · disabled.
 * A11y:         Radix supplies role="checkbox" + aria-checked; the visible label
 *               is associated via `htmlFor`. The check/minus glyph is decorative.
 * Responsive:   Row layout; 44px hit area around the control + label.
 * Composition:  Use directly for a lone checkbox; wrap in a fieldset for groups.
 */
interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label: ReactNode;
}

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const generated = useId();
  const controlId = id ?? generated;
  return (
    <div className="flex items-center gap-2.5">
      <RadixCheckbox.Root
        id={controlId}
        className={cn(
          'border-hairline bg-paper flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border outline-offset-2',
          'data-[state=checked]:bg-signal data-[state=checked]:border-signal',
          'data-[state=indeterminate]:bg-signal data-[state=indeterminate]:border-signal',
          'disabled:cursor-not-allowed disabled:opacity-[var(--op-disabled)]',
          'transition-colors duration-[var(--dur-instant)]',
          className,
        )}
        {...rest}
      >
        <RadixCheckbox.Indicator className="text-paper">
          {rest.checked === 'indeterminate' ? (
            <Icon icon={Minus} size="sm" />
          ) : (
            <Icon icon={Check} size="sm" />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        htmlFor={controlId}
        className="text-ink text-small cursor-pointer font-sans leading-snug"
      >
        {label}
      </label>
    </div>
  );
}
