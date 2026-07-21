'use client';

import { type LucideIcon } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { Spinner } from '@/components/feedback/Spinner';
import { Icon, type IconSize } from '@/components/icons';
import { type ButtonVariant } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * IconButton — a square, icon-only button with a required label (Sprint 02 §06).
 *
 * Purpose:      An icon-only action (toolbar, close, toggle) that stays fully
 *               accessible — a visible glyph, an invisible-to-sight but required
 *               accessible name.
 * Public API:   `icon`, `label` (required), `variant`, `size`, `loading`.
 * Props:        Typed unions; ≤ 7 total.
 * Variants:     variant — primary | secondary | tertiary | ghost (no `link`).
 *               size — sm | md | lg (square; touch target ≥44px at md/lg).
 * States:       default · hover · active · focus-visible · disabled · loading.
 * A11y:         `label` is compulsory (TypeScript-enforced) and becomes the
 *               button's aria-label — an icon-only control is never unlabeled
 *               (Bible §08/§11). The inner Icon stays decorative.
 * Responsive:   Fixed square from the size scale; md/lg meet the 44px target.
 * Composition:  Icons route through <Icon>; use Button for text + icon actions.
 */
export interface IconButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'aria-label'
  > {
  icon: LucideIcon;
  /** Required accessible name — the action the button performs. */
  label: string;
  variant?: Exclude<ButtonVariant, 'link'>;
  size?: ButtonSize;
  loading?: boolean;
}

type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center rounded-sm transition-colors ' +
  'duration-[var(--dur-instant)] ease-[var(--ease-datum)] outline-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-[var(--op-disabled)]';

const VARIANT: Record<Exclude<ButtonVariant, 'link'>, string> = {
  primary: 'bg-signal text-paper hover:opacity-90 active:opacity-80',
  secondary:
    'border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  tertiary: 'border border-hairline bg-surface text-ink hover:bg-sunken',
  ghost: 'bg-transparent text-ink hover:bg-sunken',
};

const SIZE: Record<ButtonSize, { box: string; icon: IconSize }> = {
  sm: { box: 'h-9 w-9', icon: 'sm' },
  md: { box: 'h-11 w-11', icon: 'md' },
  lg: { box: 'h-12 w-12', icon: 'lg' },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      label,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      className,
      type,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        aria-label={label}
        title={label}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={cn(BASE, VARIANT[variant], SIZE[size].box, className)}
        {...rest}
      >
        {loading ? (
          <Spinner size={SIZE[size].icon} label={label} />
        ) : (
          <Icon icon={icon} size={SIZE[size].icon} />
        )}
      </button>
    );
  },
);
