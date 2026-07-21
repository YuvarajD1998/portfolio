import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

/**
 * TextInput — a single-line text field (Bible §13, Sprint 02 §07).
 *
 * Purpose:      The base text control — token-styled, with invalid and disabled
 *               states driven by attributes, not colour tricks.
 * Public API:   native input props (spread the props from FieldWrapper).
 * Props:        native; ≤ 7 conceptual.
 * Variants:     None — one field; type is the native `type`.
 * States:       default · focus (global ring) · invalid (aria-invalid → danger
 *               border) · disabled (dimmed, non-interactive).
 * A11y:         No placeholder-as-label — always pair with FieldWrapper/Label.
 *               `aria-invalid` toggles the error border AND is exposed to AT.
 * Responsive:   Full-width; height meets the 44px touch target.
 * Composition:  FieldWrapper injects id + aria-*; spread them here.
 */
export const INPUT_BASE =
  'bg-paper text-ink placeholder:text-mute border-hairline w-full rounded-sm border ' +
  'px-3 h-11 font-sans text-body outline-offset-2 transition-colors ' +
  'duration-[var(--dur-instant)] ease-[var(--ease-datum)] ' +
  'aria-[invalid=true]:border-danger disabled:cursor-not-allowed ' +
  'disabled:opacity-[var(--op-disabled)]';

export const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ className, type = 'text', ...rest }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(INPUT_BASE, className)}
      {...rest}
    />
  );
});
