import { cn } from '@/lib/cn';

/**
 * Divider — the datum rule (Bible §07, §14 section signature).
 *
 * Purpose:      Draw the hairline (or heavier datum) rule that separates
 *               regions — depth by line, not shadow.
 * Public API:   `weight`, `orientation`, `className`.
 * Props:        `weight`, `orientation`; ≤ 7 total.
 * Variants:     weight — hairline (1px) | rule (1.5px Ink) | datum (2px Ink).
 *               orientation — horizontal (default) | vertical.
 * States:       Static; no interactive states.
 * A11y:         role="separator" with the correct aria-orientation.
 * Responsive:   Spans its container at any width.
 * Composition:  The section signature (Bible §14); never a decorative flourish.
 */
type DividerWeight = 'hairline' | 'rule' | 'datum';
type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  weight?: DividerWeight;
  orientation?: DividerOrientation;
  className?: string;
}

const COLOR: Record<DividerWeight, string> = {
  hairline: 'border-hairline',
  rule: 'border-ink',
  datum: 'border-ink',
};

const THICKNESS: Record<DividerWeight, Record<DividerOrientation, string>> = {
  hairline: { horizontal: 'border-t', vertical: 'border-l' },
  rule: { horizontal: 'border-t-[1.5px]', vertical: 'border-l-[1.5px]' },
  datum: { horizontal: 'border-t-2', vertical: 'border-l-2' },
};

export function Divider({
  weight = 'hairline',
  orientation = 'horizontal',
  className,
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'border-0',
        orientation === 'horizontal' ? 'w-full' : 'h-full self-stretch',
        COLOR[weight],
        THICKNESS[weight][orientation],
        className,
      )}
    />
  );
}
