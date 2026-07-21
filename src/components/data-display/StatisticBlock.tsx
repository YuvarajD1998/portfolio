import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * StatisticBlock — a borderless big-number + caption unit (Bible §04, §09).
 *
 * Purpose:      Display a headline figure with a short caption, without a card
 *               frame — for stat rows and hero counters set directly on paper.
 * Public API:   `value`, `caption`, `align`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     align — start (default) | center.
 * States:       Static.
 * A11y:         Renders value + caption as plain text; use a `<dl>` at the call
 *               site if the row is semantically a definition list.
 * Responsive:   Value uses the display step; scales with its container.
 * Composition:  Rows of these in a Grid; MetricCard is the carded variant.
 */
interface StatisticBlockProps {
  value: ReactNode;
  caption: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function StatisticBlock({
  value,
  caption,
  align = 'start',
  className,
}: StatisticBlockProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="text-ink font-display text-display leading-none tracking-[-0.015em]">
        {value}
      </span>
      <span className="text-mute text-small font-sans leading-snug">
        {caption}
      </span>
    </div>
  );
}
