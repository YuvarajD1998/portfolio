import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { Card } from '@/components/data-display/Card';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * FeatureCard — an icon + title + description card (Bible §09, Sprint 02 §07).
 *
 * Purpose:      Present a single feature/capability with a leading icon, a
 *               title and supporting copy — the workhorse of feature grids.
 * Public API:   `icon`, `title`, `children`, `interactive`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     `interactive` adds the hover lift (for linked cards).
 * States:       resting → hover lift when interactive.
 * A11y:         The icon is decorative — the title carries the meaning. If the
 *               whole card links, wrap the title in a Link and keep one target.
 * Responsive:   Fills its grid cell; stacks icon → title → body.
 * Composition:  Generic — icon and copy are props; used inside a Grid.
 */
interface FeatureCardProps {
  icon?: LucideIcon;
  title: ReactNode;
  children?: ReactNode;
  interactive?: boolean;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  children,
  interactive,
  className,
}: FeatureCardProps) {
  return (
    <Card
      interactive={interactive}
      className={cn('flex flex-col gap-3', className)}
    >
      {icon ? (
        <span className="text-signal inline-flex">
          <Icon icon={icon} size="lg" />
        </span>
      ) : null}
      <h3 className="text-ink text-h3 font-sans leading-snug font-semibold">
        {title}
      </h3>
      {children ? (
        <p className="text-graphite text-small leading-[1.6]">{children}</p>
      ) : null}
    </Card>
  );
}
