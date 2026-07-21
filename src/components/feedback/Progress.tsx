'use client';

import * as RadixProgress from '@radix-ui/react-progress';

import { cn } from '@/lib/cn';

/**
 * Progress — a determinate progress bar (Bible §13, Sprint 02 §08).
 *
 * Purpose:      Show completion of a known-length task as a filled track — the
 *               determinate counterpart to Spinner.
 * Public API:   `value`, `max`, `label`, `className`.
 * Props:        `value`, `max`, `label`; ≤ 7 total.
 * Variants:     None — one track; indeterminate work uses Spinner instead.
 * States:       Fill width tracks `value`; transitions on the standard duration.
 * A11y:         Radix Progress supplies role="progressbar" with aria-valuenow/max;
 *               `label` provides the accessible name. Value is exposed
 *               programmatically, never colour-only.
 * Responsive:   Fills its container width; height is a fixed token.
 * Composition:  Wraps Radix Progress — behaviour is Radix's, styling is ours.
 */
interface ProgressProps {
  /** Current value, 0…max. */
  value: number;
  /** Maximum value. Default 100. */
  max?: number;
  /** Accessible label for the bar. */
  label?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <RadixProgress.Root
      value={value}
      max={max}
      aria-label={label}
      className={cn(
        'bg-sunken relative h-2 w-full overflow-hidden rounded-sm',
        className,
      )}
    >
      <RadixProgress.Indicator
        className="bg-signal h-full transition-transform duration-[var(--dur-standard)] ease-[var(--ease-datum)]"
        style={{ transform: `translateX(-${100 - pct}%)` }}
      />
    </RadixProgress.Root>
  );
}
