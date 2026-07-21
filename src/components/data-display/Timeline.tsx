import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Timeline / TimelineItem — a vertical sequence of events (Bible §09, §14).
 *
 * Purpose:      Render an ordered sequence (roles, milestones, process steps) as
 *               a connected vertical rail with a node per item.
 * Public API:   <Timeline> wraps <TimelineItem time title>; children are the
 *               item body.
 * Props:        item — `time`, `title`; ≤ 7 total.
 * Variants:     None — one rail treatment.
 * States:       Static.
 * A11y:         Renders as an ordered list (`<ol>`/`<li>`) so AT announces the
 *               sequence and position; the rail/node is decorative.
 * Responsive:   Rail stays left; content wraps. Size-agnostic.
 * Composition:  `<Timeline>` + one `<TimelineItem>` per event.
 */
export function Timeline({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <ol className={cn('flex flex-col', className)}>{children}</ol>;
}

interface TimelineItemProps {
  /** A short time/marker label, e.g. "2024" or "Step 1". */
  time?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

function TimelineItem({ time, title, children, className }: TimelineItemProps) {
  return (
    <li
      className={cn(
        'border-hairline relative flex flex-col gap-1 border-l pb-8 pl-6 last:pb-0',
        className,
      )}
    >
      <span
        aria-hidden
        className="border-signal bg-paper absolute top-1 -left-[5px] h-2.5 w-2.5 rounded-full border-2"
      />
      {time ? (
        <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
          {time}
        </span>
      ) : null}
      <span className="text-ink text-body font-sans leading-snug font-semibold">
        {title}
      </span>
      {children ? (
        <div className="text-graphite text-small leading-[1.6]">{children}</div>
      ) : null}
    </li>
  );
}

Timeline.Item = TimelineItem;

export { TimelineItem };
