/**
 * Shared menu styling for Dropdown/Context menus (Sprint 02 §08).
 *
 * DropdownMenu and ContextMenu are the same visual surface with different
 * triggers, so the class strings live once here and both import them — no
 * duplicated design logic (Playbook §09 G6).
 */
export const MENU_CONTENT =
  'datum-popover-in bg-paper border-hairline z-overlay min-w-44 rounded-md border p-1 shadow-e2 focus:outline-none';

export const MENU_ITEM =
  'text-ink relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-2 text-small outline-none ' +
  'data-[highlighted]:bg-signal-tint ' +
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--op-disabled)]';

export const MENU_LABEL =
  'text-mute px-2.5 py-1.5 font-mono text-label uppercase tracking-[0.14em]';

export const MENU_SEPARATOR = 'bg-hairline my-1 h-px';
