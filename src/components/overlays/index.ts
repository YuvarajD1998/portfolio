/**
 * Overlays — floating surfaces on Radix primitives (Sprint 02 §08).
 *
 * Styling is ours; behaviour and a11y (focus trap, dismissal, keyboard, labels)
 * are Radix's and never re-implemented by hand. Every part is a named export so
 * the barrel stays tree-shakeable; heavy overlays can be code-split at the call
 * site with `next/dynamic` when a route only needs them conditionally
 * (Sprint 02 §11 lazy loading).
 */
export { Dialog, DialogTrigger, DialogClose, DialogContent } from './Dialog';
export { Drawer, DrawerTrigger, DrawerClose, DrawerContent } from './Drawer';
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
} from './Popover';
export { Tooltip, TooltipProvider } from './Tooltip';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './DropdownMenu';
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from './ContextMenu';
