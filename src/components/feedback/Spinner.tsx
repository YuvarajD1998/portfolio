import { Loader2 } from 'lucide-react';

import { Icon, type IconSize } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Spinner — an indeterminate loading indicator (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Signal indeterminate work in progress with a spinning glyph —
 *               the smallest unit of "busy" feedback, reused by Button and
 *               LoadingState.
 * Public API:   `size`, `label`, `className`.
 * Props:        `size`, `label`; ≤ 7 total.
 * Variants:     size — sm | md | lg (the icon scale).
 * States:       Perpetual spin; collapses to static under reduced-motion (the
 *               global media query freezes the animation — meaning stays via
 *               the accessible label).
 * A11y:         `role="status"`; when `label` is given it becomes the accessible
 *               name and the icon is announced. Decorative without a label.
 * Responsive:   Fixed size from the icon scale.
 * Composition:  Embedded in Button/IconButton loading and LoadingState.
 */
interface SpinnerProps {
  size?: IconSize;
  /** Accessible status label, e.g. "Loading". Omit for purely decorative use. */
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      aria-live="polite"
      className={cn('inline-flex', className)}
    >
      <Icon icon={Loader2} size={size} className="motion-safe:animate-spin" />
    </span>
  );
}
