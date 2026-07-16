import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

/**
 * The single sizing scale for icons (Bible §08). 20 is the default.
 * No icon renders at a size outside this scale.
 */
export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

export interface IconProps {
  /** A Lucide icon component — the only icon source (Bible §08). */
  icon: LucideIcon;
  /** Size from the fixed scale. Default `md` (20px). */
  size?: IconSize;
  /**
   * Accessible label. Provide it when the icon conveys meaning on its own;
   * omit it for decorative icons, which are hidden from assistive tech.
   */
  label?: string;
  className?: string;
}

/**
 * The single icon component. Every icon in the app routes through here — a raw
 * Lucide import in a feature is a review reject (Sprint 01 §08).
 *
 * Enforces the house rules from Bible §08: outline set, one weight, 1.5px
 * stroke, the fixed size scale, and accessibility defaults (labelled icons get
 * `role="img"`; unlabelled ones are `aria-hidden`). Colour comes from
 * `currentColor` so the icon inherits Ink/Mute/Signal from its context —
 * never hardcoded.
 *
 * @example
 * <Icon icon={Search} />                    // decorative, 20px
 * <Icon icon={Menu} label="Open menu" />    // meaningful, announced
 */
export function Icon({
  icon: LucideGlyph,
  size = 'md',
  label,
  className,
}: IconProps) {
  const px = ICON_SIZES[size];
  const decorative = label === undefined;

  return (
    <LucideGlyph
      width={px}
      height={px}
      strokeWidth={1.5}
      absoluteStrokeWidth
      className={cn('inline-block shrink-0', className)}
      aria-hidden={decorative || undefined}
      aria-label={label}
      role={decorative ? undefined : 'img'}
      focusable={false}
    />
  );
}
