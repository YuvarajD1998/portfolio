import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * StatePanel — the shared centred-message layout (Sprint 02 §08).
 *
 * Purpose:      The common frame behind EmptyState / SuccessState / ErrorState:
 *               a centred icon, title, description and optional action slot.
 *               Internal building block — categories export the named states.
 * Public API:   `icon`, `iconTone`, `title`, `description`, `action`, `role`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     Colour comes from `iconTone`; the named states set it.
 * States:       Static presentational panel.
 * A11y:         `role` is passed by the caller (status vs alert); the icon is
 *               decorative because the title states the meaning.
 * Responsive:   Centres within its container; text caps to the measure.
 * Composition:  Not exported at top level directly — the named states wrap it.
 */
export interface StatePanelProps {
  icon: LucideIcon;
  iconTone?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  role?: 'status' | 'alert';
  className?: string;
}

export function StatePanel({
  icon,
  iconTone = 'text-mute',
  title,
  description,
  action,
  role = 'status',
  className,
}: StatePanelProps) {
  return (
    <div
      role={role}
      className={cn(
        'flex flex-col items-center gap-4 px-6 py-16 text-center',
        className,
      )}
    >
      <span className={cn('inline-flex', iconTone)}>
        <Icon icon={icon} size="lg" />
      </span>
      <div className="flex max-w-[36ch] flex-col gap-2">
        <p className="text-ink text-h3 font-sans leading-snug font-semibold">
          {title}
        </p>
        {description ? (
          <p className="text-graphite text-small leading-[1.6]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
