'use client';

import { type ReactNode } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/overlays';

/**
 * MobileNav — the small-screen navigation panel (Bible §09, Sprint 02 §05).
 *
 * Purpose:      A slide-in panel of nav links for small screens, built on the
 *               Drawer overlay so focus trap and dismissal are inherited. Unwired:
 *               links are children; the caller supplies the trigger + items.
 * Public API:   `trigger`, `title`, `open`, `onOpenChange`, `children`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — a left-anchored sheet.
 * States:       closed · open (controlled or uncontrolled via Drawer).
 * A11y:         Drawer (Radix Dialog) supplies focus trap, Esc/overlay dismissal
 *               and labelling; the trigger's own aria (e.g. a NavToggle) is the
 *               caller's. Links stack vertically for easy tapping.
 * Responsive:   Intended below md; hidden on desktop by the caller.
 * Composition:  Pass a NavToggle as `trigger`; NavItem children as the list.
 */
interface MobileNavProps {
  /** The control that opens the panel (e.g. a NavToggle). */
  trigger: ReactNode;
  title: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function MobileNav({
  trigger,
  title,
  open,
  onOpenChange,
  children,
}: MobileNavProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent side="left" title={title}>
        <ul className="flex flex-col gap-2">{children}</ul>
      </DrawerContent>
    </Drawer>
  );
}
