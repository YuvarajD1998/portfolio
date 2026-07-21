'use client';

import * as RadixSwitch from '@radix-ui/react-switch';
import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react';

import { cn } from '@/lib/cn';

/**
 * Switch — a labelled on/off toggle (Bible §13, Sprint 02 §07).
 *
 * Purpose:      A binary toggle for immediate settings, on Radix Switch for
 *               state + keyboard behaviour. Prefer Checkbox for form submission
 *               semantics; Switch for "applies instantly" controls.
 * Public API:   `label`, plus Radix Switch props (checked, defaultChecked,
 *               onCheckedChange, disabled, name, value).
 * Props:        Typed; ≤ 7 conceptual.
 * Variants:     None.
 * States:       off · on · focus · disabled. State is shown by thumb position
 *               AND track colour — position carries meaning without colour.
 * A11y:         Radix supplies role="switch" + aria-checked; the visible label
 *               is associated via `htmlFor`.
 * Responsive:   Row layout; comfortable hit area.
 * Composition:  Use directly; label sits beside the track.
 */
interface SwitchProps
  extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label: ReactNode;
}

export function Switch({ label, className, id, ...rest }: SwitchProps) {
  const generated = useId();
  const controlId = id ?? generated;
  return (
    <div className="flex items-center gap-2.5">
      <RadixSwitch.Root
        id={controlId}
        className={cn(
          'bg-sunken relative h-6 w-10 shrink-0 rounded-full outline-offset-2 transition-colors',
          'data-[state=checked]:bg-signal',
          'disabled:cursor-not-allowed disabled:opacity-[var(--op-disabled)]',
          'duration-[var(--dur-instant)]',
          className,
        )}
        {...rest}
      >
        <RadixSwitch.Thumb
          className={cn(
            'bg-paper shadow-e1 block h-5 w-5 translate-x-0.5 rounded-full transition-transform',
            'duration-[var(--dur-instant)] data-[state=checked]:translate-x-[18px]',
          )}
        />
      </RadixSwitch.Root>
      <label
        htmlFor={controlId}
        className="text-ink text-small cursor-pointer font-sans leading-snug"
      >
        {label}
      </label>
    </div>
  );
}
