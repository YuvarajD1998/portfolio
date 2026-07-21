import { Spinner } from '@/components/feedback/Spinner';
import { cn } from '@/lib/cn';

/**
 * LoadingState — a centred "busy" panel for a region (Sprint 02 §08).
 *
 * Purpose:      Fill a region that is loading with a spinner and a short label —
 *               the region-level counterpart to Skeleton (which mocks shape).
 * Public API:   `label`, `className`.
 * Props:        `label`; ≤ 7 total.
 * Variants:     None.
 * States:       Perpetual spin (frozen under reduced-motion; the label stays).
 * A11y:         The Spinner carries role="status" + the label, so AT announces
 *               the busy state without relying on the animation.
 * Responsive:   Centres within its container.
 * Composition:  Use for whole-region loads; Skeleton for content-shaped loads.
 */
interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({
  label = 'Loading',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-16 text-center',
        className,
      )}
    >
      <Spinner size="lg" label={label} className="text-mute" />
      <p className="text-mute text-label font-mono tracking-[0.14em] uppercase">
        {label}
      </p>
    </div>
  );
}
