import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Callout — an editorial aside on a tinted surface (Bible §07, Sprint 02 §07).
 *
 * Purpose:      Set an important note apart from the flow — the "governing
 *               principle" box of the design docs — with a Signal datum rule.
 *               Distinct from Alert: Callout is editorial emphasis, not a
 *               transient/validation status.
 * Public API:   `title`, `icon`, `children`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one editorial treatment (Signal left rule on surface).
 * States:       Static.
 * A11y:         Presentational aside; renders `<aside>` so AT can skip it. The
 *               optional icon is decorative.
 * Responsive:   Full-width block; content wraps.
 * Composition:  Inline in long-form; use Quote for quotations, Alert for status.
 */
interface CalloutProps {
  title?: ReactNode;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function Callout({ title, icon, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        'bg-surface border-hairline border-signal rounded-sm border border-l-2 p-5',
        className,
      )}
    >
      {title || icon ? (
        <div className="mb-2 flex items-center gap-2">
          {icon ? <Icon icon={icon} size="sm" className="text-signal" /> : null}
          {title ? (
            <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
              {title}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="text-graphite text-small leading-[1.6]">{children}</div>
    </aside>
  );
}
