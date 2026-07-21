'use client';

import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { type ComponentPropsWithoutRef } from 'react';

import {
  MENU_CONTENT,
  MENU_ITEM,
  MENU_LABEL,
  MENU_SEPARATOR,
} from '@/components/overlays/menu-styles';
import { cn } from '@/lib/cn';

/**
 * ContextMenu — a right-click menu on Radix Context Menu (Sprint 02 §08).
 *
 * Purpose:      A menu triggered by right-click / long-press over a region,
 *               sharing the DropdownMenu surface.
 * Public API:   <ContextMenu> · <ContextMenuTrigger> · <ContextMenuContent> ·
 *               <ContextMenuItem> · <ContextMenuLabel> · <ContextMenuSeparator>.
 * Props:        Radix passthrough; ≤ 7 per part.
 * Variants:     None — same surface as DropdownMenu.
 * States:       closed · open; items: default · highlighted · disabled.
 * A11y:         Radix supplies the menu semantics, keyboard navigation and
 *               dismissal; the trigger also responds to the keyboard context-
 *               menu key. Never re-implemented by hand.
 * Responsive:   Opens at the pointer; collision-aware.
 * Composition:  Trigger wraps the target region; content holds items.
 */
export const ContextMenu = RadixContextMenu.Root;
export const ContextMenuTrigger = RadixContextMenu.Trigger;
export const ContextMenuGroup = RadixContextMenu.Group;

export function ContextMenuContent({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixContextMenu.Content>) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content
        className={cn(MENU_CONTENT, className)}
        {...rest}
      />
    </RadixContextMenu.Portal>
  );
}

export function ContextMenuItem({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixContextMenu.Item>) {
  return (
    <RadixContextMenu.Item className={cn(MENU_ITEM, className)} {...rest} />
  );
}

export function ContextMenuLabel({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixContextMenu.Label>) {
  return (
    <RadixContextMenu.Label className={cn(MENU_LABEL, className)} {...rest} />
  );
}

export function ContextMenuSeparator({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixContextMenu.Separator>) {
  return (
    <RadixContextMenu.Separator
      className={cn(MENU_SEPARATOR, className)}
      {...rest}
    />
  );
}
