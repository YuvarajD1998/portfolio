'use client';

import { Menu, X } from 'lucide-react';

import { IconButton } from '@/components/ui';

/**
 * NavToggle — the open/close control for mobile nav (Bible §13, Sprint 02 §05).
 *
 * Purpose:      A hamburger / close button that reflects and flips the open
 *               state — the trigger a MobileNav pairs with. Unwired: the caller
 *               owns the open state.
 * Public API:   `open`, `onToggle`, `controls`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     Glyph flips menu ↔ close with the `open` state.
 * States:       closed (menu icon) · open (close icon) · hover · focus.
 * A11y:         `aria-expanded` reflects the state; `aria-controls` points to
 *               the panel id; the label flips so AT hears "Open"/"Close menu".
 *               State is carried by icon + label + aria, never colour alone.
 * Responsive:   Shown at small widths; hidden on desktop by the caller.
 * Composition:  Pairs with MobileNav; the caller lifts the open state.
 */
interface NavToggleProps {
  open: boolean;
  onToggle: () => void;
  /** id of the panel this toggle controls. */
  controls?: string;
  className?: string;
}

export function NavToggle({
  open,
  onToggle,
  controls,
  className,
}: NavToggleProps) {
  return (
    <IconButton
      icon={open ? X : Menu}
      label={open ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={className}
    />
  );
}
