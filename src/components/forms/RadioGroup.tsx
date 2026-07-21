'use client';

import * as RadixRadio from '@radix-ui/react-radio-group';
import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react';

import { cn } from '@/lib/cn';

/**
 * RadioGroup — a single-choice set of radios (Bible §13, Sprint 02 §07).
 *
 * Purpose:      A mutually-exclusive option set on Radix RadioGroup, which
 *               provides roving-tabindex arrow-key navigation for free.
 * Public API:   <RadioGroup> (Radix RadioGroup props) + <Radio value label>.
 * Props:        Typed; ≤ 7 conceptual.
 * Variants:     None.
 * States:       per item: unselected · selected · focus · disabled.
 * A11y:         Radix supplies role="radiogroup"/"radio", arrow-key navigation
 *               and roving focus; each item's label is associated via `htmlFor`.
 *               Wrap in a fieldset+legend (or FieldWrapper) to name the group.
 * Responsive:   Column layout by default; size-agnostic.
 * Composition:  `<RadioGroup>` holds `<Radio>` children.
 */
type RadioGroupProps = ComponentPropsWithoutRef<typeof RadixRadio.Root>;

export function RadioGroup({ className, ...rest }: RadioGroupProps) {
  return (
    <RadixRadio.Root
      className={cn('flex flex-col gap-2.5', className)}
      {...rest}
    />
  );
}

interface RadioProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixRadio.Item>, 'children'> {
  label: ReactNode;
}

export function Radio({ label, className, id, value, ...rest }: RadioProps) {
  const generated = useId();
  const controlId = id ?? generated;
  return (
    <div className="flex items-center gap-2.5">
      <RadixRadio.Item
        id={controlId}
        value={value}
        className={cn(
          'border-hairline bg-paper flex h-5 w-5 shrink-0 items-center justify-center rounded-full border outline-offset-2',
          'data-[state=checked]:border-signal',
          'disabled:cursor-not-allowed disabled:opacity-[var(--op-disabled)]',
          'transition-colors duration-[var(--dur-instant)]',
          className,
        )}
        {...rest}
      >
        <RadixRadio.Indicator className="bg-signal h-2.5 w-2.5 rounded-full" />
      </RadixRadio.Item>
      <label
        htmlFor={controlId}
        className="text-ink text-small cursor-pointer font-sans leading-snug"
      >
        {label}
      </label>
    </div>
  );
}
