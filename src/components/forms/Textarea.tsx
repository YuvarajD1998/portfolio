import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { INPUT_BASE } from '@/components/forms/TextInput';
import { cn } from '@/lib/cn';

/**
 * Textarea — a multi-line text field (Bible §13, Sprint 02 §07).
 *
 * Purpose:      The multi-line counterpart to TextInput, sharing its field
 *               styling and state behaviour.
 * Public API:   native textarea props (spread the props from FieldWrapper).
 * Props:        native; ≤ 7 conceptual.
 * Variants:     None.
 * States:       default · focus · invalid (aria-invalid) · disabled.
 * A11y:         Pair with FieldWrapper/Label; `aria-invalid` toggles the error
 *               border and is exposed to AT.
 * Responsive:   Full-width; vertically resizable, min height for comfortable use.
 * Composition:  FieldWrapper injects id + aria-*; spread them here.
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 4, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(INPUT_BASE, 'h-auto min-h-24 resize-y py-2.5', className)}
      {...rest}
    />
  );
});
