import { type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { type PolymorphicProps } from '@/types/polymorphic';

/**
 * Show / Hide — breakpoint-driven visibility (Bible §05, Sprint 02 §10).
 *
 * Purpose:      Reveal or hide content at named breakpoints using CSS only — no
 *               JS, no device sniffing. Responsive by breakpoint, never by device.
 * Public API:   Show: `above` | `below`; Hide: `above` | `below`; `as`.
 * Props:        one of `above`/`below` (a named breakpoint); ≤ 7 total.
 * Variants:     Show above/below a breakpoint; Hide above/below a breakpoint.
 * States:       Static; visibility toggles purely via Tailwind responsive
 *               utilities (the tokens' sm/md/lg).
 * A11y:         `display:none` at a breakpoint removes content from the a11y
 *               tree too — intended, since it is genuinely not shown there. Do
 *               not use it to hide something only visually (use VisuallyHidden).
 * Responsive:   The whole point — reads the Sprint 01 breakpoint scale.
 * Composition:  Wrap the content that only applies at some widths (e.g. a
 *               NavigationBar above md, a NavToggle below md).
 */
export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg';

/** Hidden by default, shown from the breakpoint up (`above`) or only below it. */
const SHOW_ABOVE: Record<ResponsiveBreakpoint, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
};
const SHOW_BELOW: Record<ResponsiveBreakpoint, string> = {
  sm: 'block sm:hidden',
  md: 'block md:hidden',
  lg: 'block lg:hidden',
};

interface ShowProps {
  /** Show at this breakpoint and up. */
  above?: ResponsiveBreakpoint;
  /** Show only below this breakpoint. */
  below?: ResponsiveBreakpoint;
}

export function Show<E extends ElementType = 'div'>({
  as,
  above,
  below,
  className,
  ...rest
}: PolymorphicProps<E, ShowProps>) {
  const Component = (as ?? 'div') as ElementType;
  const rule = above ? SHOW_ABOVE[above] : below ? SHOW_BELOW[below] : 'block';
  return <Component className={cn(rule, className)} {...rest} />;
}

interface HideProps {
  /** Hide at this breakpoint and up. */
  above?: ResponsiveBreakpoint;
  /** Hide only below this breakpoint. */
  below?: ResponsiveBreakpoint;
}

export function Hide<E extends ElementType = 'div'>({
  as,
  above,
  below,
  className,
  ...rest
}: PolymorphicProps<E, HideProps>) {
  const Component = (as ?? 'div') as ElementType;
  // Hide above X === show only below X; hide below X === show only above X.
  const rule = above ? SHOW_BELOW[above] : below ? SHOW_ABOVE[below] : 'block';
  return <Component className={cn(rule, className)} {...rest} />;
}
