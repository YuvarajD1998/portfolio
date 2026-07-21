'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Drawer — a side sheet on Radix Dialog (Bible §13, Sprint 02 §08).
 *
 * Purpose:      An edge-anchored panel for navigation, filters or detail — same
 *               modal semantics as Dialog, anchored to a screen side.
 * Public API:   <Drawer> (Radix Root) · <DrawerTrigger> · <DrawerContent
 *               side title description> · <DrawerClose>.
 * Props:        content — `side`, `title` (required), `description`; ≤ 7 total.
 * Variants:     side — right (default) | left.
 * States:       closed · open (slide-in, reduced-motion honoured).
 * A11y:         Built on Radix Dialog, so focus trap, scroll lock, Esc/overlay
 *               dismissal and labelling come for free; close button is labelled.
 * Responsive:   Caps width on desktop; near-full-width on small screens.
 * Composition:  Compose trigger + content; body is free children.
 */
export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

type DrawerSide = 'left' | 'right';

interface DrawerContentProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixDialog.Content>, 'title'> {
  side?: DrawerSide;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

const SIDE: Record<DrawerSide, string> = {
  right: 'right-0 datum-drawer-right border-l',
  left: 'left-0 datum-drawer-left border-r',
};

export function DrawerContent({
  side = 'right',
  title,
  description,
  className,
  children,
  ...rest
}: DrawerContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="datum-overlay-in z-overlay fixed inset-0 bg-[var(--scrim)]" />
      <RadixDialog.Content
        className={cn(
          'bg-paper border-hairline z-modal shadow-e3 fixed inset-y-0 flex w-[min(24rem,90vw)] flex-col p-6 focus:outline-none',
          SIDE[side],
          className,
        )}
        {...rest}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <RadixDialog.Title className="text-ink font-display text-h3 leading-snug">
              {title}
            </RadixDialog.Title>
            {description ? (
              <RadixDialog.Description className="text-graphite text-small">
                {description}
              </RadixDialog.Description>
            ) : null}
          </div>
          <RadixDialog.Close
            aria-label="Close drawer"
            className="text-mute hover:text-ink -mt-3 -mr-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-colors"
          >
            <Icon icon={X} />
          </RadixDialog.Close>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
