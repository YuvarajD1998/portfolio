'use client';

import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef } from 'react';

import {
  MENU_CONTENT,
  MENU_ITEM,
  MENU_LABEL,
  MENU_SEPARATOR,
} from '@/components/overlays/menu-styles';
import { cn } from '@/lib/cn';

/**
 * DropdownMenu — an actions menu on Radix Dropdown Menu (Sprint 02 §08).
 *
 * Purpose:      A button-triggered menu of actions with full keyboard support.
 * Public API:   <DropdownMenu> · <DropdownMenuTrigger> · <DropdownMenuContent> ·
 *               <DropdownMenuItem> · <DropdownMenuLabel> · <DropdownMenuSeparator>.
 * Props:        Radix passthrough; ≤ 7 per part.
 * Variants:     None — one menu surface (shared with ContextMenu).
 * States:       closed · open; items: default · highlighted · disabled.
 * A11y:         Radix supplies role="menu"/menuitem, arrow-key navigation,
 *               typeahead, focus return and Esc/outside dismissal — never
 *               hand-rolled. Trigger/content aria wiring is Radix's.
 * Responsive:   Collision-aware positioning.
 * Composition:  Trigger + content holding items/labels/separators.
 */
export const DropdownMenu = RadixMenu.Root;
export const DropdownMenuTrigger = RadixMenu.Trigger;
export const DropdownMenuGroup = RadixMenu.Group;

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixMenu.Content>) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content
        sideOffset={sideOffset}
        className={cn(MENU_CONTENT, className)}
        {...rest}
      />
    </RadixMenu.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixMenu.Item>) {
  return <RadixMenu.Item className={cn(MENU_ITEM, className)} {...rest} />;
}

export function DropdownMenuLabel({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixMenu.Label>) {
  return <RadixMenu.Label className={cn(MENU_LABEL, className)} {...rest} />;
}

export function DropdownMenuSeparator({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixMenu.Separator>) {
  return (
    <RadixMenu.Separator className={cn(MENU_SEPARATOR, className)} {...rest} />
  );
}
