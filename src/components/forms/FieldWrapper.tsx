import { useId, type ReactNode } from 'react';

import { HelperText } from '@/components/forms/HelperText';
import { Label } from '@/components/forms/Label';
import { ValidationMessage } from '@/components/forms/ValidationMessage';
import { cn } from '@/lib/cn';

/**
 * FieldWrapper — the accessible field frame (Bible §11, Sprint 02 §07).
 *
 * Purpose:      Wire a Label, an optional helper hint and an optional validation
 *               error to a control — generating ids and the ARIA plumbing so
 *               every field is labelled, describable and validatable without the
 *               caller hand-wiring `aria-describedby`.
 * Public API:   `label`, `required`, `helperText`, `error`, `children` (a render
 *               prop receiving the wired control props).
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one field frame.
 * States:       valid | invalid (error present → aria-invalid + error shown,
 *               helper hidden to avoid double-describing).
 * A11y:         Associates the Label via `htmlFor`/`id`; sets `aria-describedby`
 *               to helper and/or error ids; sets `aria-invalid`/`aria-required`.
 *               No placeholder-as-label; error carried by icon + text.
 * Responsive:   Stacks label → control → message; size-agnostic.
 * Composition:  Wraps any control that spreads the injected props (TextInput,
 *               Textarea, Select, and the Radix controls' triggers).
 */
export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  'aria-required'?: true;
}

interface FieldWrapperProps {
  label: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  error?: ReactNode;
  className?: string;
  /** Render prop: receives the ARIA-wired props to spread onto the control. */
  children: (props: FieldControlProps) => ReactNode;
}

export function FieldWrapper({
  label,
  required,
  helperText,
  error,
  className,
  children,
}: FieldWrapperProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  const describedBy =
    [invalid ? errorId : null, helperText && !invalid ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  const controlProps: FieldControlProps = {
    id,
    'aria-describedby': describedBy,
    ...(invalid ? { 'aria-invalid': true } : {}),
    ...(required ? { 'aria-required': true } : {}),
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children(controlProps)}
      {invalid ? (
        <ValidationMessage id={errorId}>{error}</ValidationMessage>
      ) : helperText ? (
        <HelperText id={helperId}>{helperText}</HelperText>
      ) : null}
    </div>
  );
}
