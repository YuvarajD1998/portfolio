import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import { Card } from '@/components/data-display/Card';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * MetricCard — a single headline metric in a card (Bible §09, Sprint 02 §07).
 *
 * Purpose:      Present one KPI — a big value, a label, and an optional trend —
 *               as a self-contained card for dashboards and case-study impact.
 * Public API:   `value`, `label`, `trend`, `icon`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     trend direction — up | down | neutral (icon + colour + sign).
 * States:       Static.
 * A11y:         The trend is carried by an arrow icon AND the signed value, not
 *               colour alone; the delta has an accessible phrasing.
 * Responsive:   Fills its grid cell.
 * Composition:  Generic — pass any value/label; never hardcodes project data.
 */
interface MetricCardProps {
  value: ReactNode;
  label: ReactNode;
  /** Optional trend, e.g. { direction: 'up', delta: '+12%' }. */
  trend?: { direction: 'up' | 'down' | 'neutral'; delta: string };
  icon?: LucideIcon;
  className?: string;
}

const TREND: Record<
  'up' | 'down' | 'neutral',
  { icon: LucideIcon | null; tone: string; word: string }
> = {
  up: { icon: ArrowUpRight, tone: 'text-success', word: 'up' },
  down: { icon: ArrowDownRight, tone: 'text-danger', word: 'down' },
  neutral: { icon: null, tone: 'text-mute', word: 'no change' },
};

export function MetricCard({
  value,
  label,
  trend,
  icon,
  className,
}: MetricCardProps) {
  const t = trend ? TREND[trend.direction] : null;
  return (
    <Card className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-mute text-label font-mono tracking-[0.14em] uppercase">
          {label}
        </span>
        {icon ? <Icon icon={icon} size="sm" className="text-mute" /> : null}
      </div>
      <div className="text-ink font-display text-h1 leading-none">{value}</div>
      {trend && t ? (
        <div className={cn('text-small flex items-center gap-1', t.tone)}>
          {t.icon ? <Icon icon={t.icon} size="sm" /> : null}
          <span>{trend.delta}</span>
          <span className="sr-only"> ({t.word})</span>
        </div>
      ) : null}
    </Card>
  );
}
