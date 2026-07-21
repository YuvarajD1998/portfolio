'use client';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { type LucideIcon } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { Spinner } from '@/components/feedback/Spinner';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Button — the single, variant-driven button system (Bible §13, Sprint 02 §06).
 *
 * Purpose:      One component covering every button use — primary through ghost,
 *               link and icon — with a full set of states. One component, many
 *               variants; never seven separate buttons.
 * Public API:   `variant`, `size`, `leadingIcon`, `trailingIcon`, `loading`,
 *               `fullWidth`, `asChild`, plus native button props.
 * Props:        Typed unions, no boolean soup; ≤ 7 conceptual props.
 * Variants:     variant — primary | secondary | tertiary | ghost | link.
 *               size — sm | md | lg. (Icon-only → use IconButton.)
 * States:       default · hover · active · focus-visible · disabled · loading.
 *               Loading and disabled read beyond colour: a Spinner + disabled
 *               semantics, not a hue change alone (Bible §11).
 * A11y:         Real <button> (or the child via `asChild`, e.g. an anchor that
 *               looks like a button). Loading sets aria-busy and disables the
 *               control; focus ring is the global 2px Signal. Touch target ≥44px
 *               at md/lg; sm stays ≥36px for dense toolbars but keeps focus size.
 * Responsive:   Size-agnostic; `fullWidth` stretches on narrow layouts.
 * Composition:  Icons route through <Icon>; compose leading/trailing glyphs via
 *               props, never raw SVG. `asChild` renders a Link as a button.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading glyph — a Lucide icon, routed through <Icon>. */
  leadingIcon?: LucideIcon;
  /** Trailing glyph — a Lucide icon, routed through <Icon>. */
  trailingIcon?: LucideIcon;
  /** Show a spinner and mark the control busy + disabled. */
  loading?: boolean;
  /** Stretch to the container width. */
  fullWidth?: boolean;
  /** Render the single child element as the button (e.g. a Link). */
  asChild?: boolean;
  children?: ReactNode;
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-sm font-sans text-button font-medium ' +
  'whitespace-nowrap select-none transition-colors duration-[var(--dur-instant)] ease-[var(--ease-datum)] ' +
  'outline-offset-2 disabled:pointer-events-none disabled:opacity-[var(--op-disabled)] ' +
  'aria-disabled:pointer-events-none aria-disabled:opacity-[var(--op-disabled)]';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-signal text-paper hover:opacity-90 active:opacity-80',
  secondary:
    'border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  tertiary: 'border border-hairline bg-surface text-ink hover:bg-sunken',
  ghost: 'bg-transparent text-ink hover:bg-sunken',
  link: 'bg-transparent text-signal p-0 h-auto underline-offset-2 hover:underline',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-small',
  md: 'h-11 px-5',
  lg: 'h-12 px-6',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      loading = false,
      fullWidth = false,
      asChild = false,
      disabled,
      className,
      children,
      type,
      ...rest
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    const leading = loading ? (
      <Spinner size="sm" label="Loading" />
    ) : leadingIcon ? (
      <Icon icon={leadingIcon} size="sm" />
    ) : null;
    const trailing =
      !loading && trailingIcon ? <Icon icon={trailingIcon} size="sm" /> : null;

    return (
      // Children are passed FLAT (not wrapped in an extra Fragment) so Radix
      // Slot can find the <Slottable> and merge props onto the real child when
      // `asChild` is set, while still composing the leading/trailing glyphs.
      <Comp
        ref={ref}
        className={cn(
          BASE,
          VARIANT[variant],
          variant !== 'link' && SIZE[size],
          fullWidth && 'w-full',
          className,
        )}
        aria-busy={loading || undefined}
        // A real <button> gets the native disabled attribute; a Slot child
        // (anchor) gets aria-disabled since anchors can't be truly disabled.
        {...(asChild
          ? { 'aria-disabled': isDisabled || undefined }
          : { disabled: isDisabled, type: type ?? 'button' })}
        {...rest}
      >
        {leading}
        <Slottable>{children}</Slottable>
        {trailing}
      </Comp>
    );
  },
);
