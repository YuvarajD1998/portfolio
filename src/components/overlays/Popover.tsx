'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

/**
 * Popover — a non-modal floating panel on Radix Popover (Sprint 02 §08).
 *
 * Purpose:      Anchored, dismissible content (a small form, details, help)
 *               that does not trap focus like a Dialog.
 * Public API:   <Popover> · <PopoverTrigger> · <PopoverContent>.
 * Props:        content — Radix side/align/sideOffset; ≤ 7 total.
 * Variants:     Positioning via Radix side/align props.
 * States:       closed · open (fade-in; reduced-motion honoured).
 * A11y:         Radix manages focus, outside-click and Esc dismissal and the
 *               trigger/content aria wiring; the content is labelled by its own
 *               heading if present.
 * Responsive:   Collision-aware positioning via Radix.
 * Composition:  Trigger + content; content is free children.
 */
export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;

export function PopoverContent({
  className,
  sideOffset = 6,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixPopover.Content>) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={sideOffset}
        className={cn(
          'datum-popover-in bg-paper border-hairline text-graphite z-overlay text-small shadow-e2 w-64 rounded-md border p-4 focus:outline-none',
          className,
        )}
        {...rest}
      />
    </RadixPopover.Portal>
  );
}
