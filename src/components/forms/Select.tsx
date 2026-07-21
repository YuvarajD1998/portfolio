'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { INPUT_BASE } from '@/components/forms/TextInput';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Select — a styled single-choice dropdown (Bible §13, Sprint 02 §07).
 *
 * Purpose:      A custom-styled but fully accessible select, on Radix Select for
 *               keyboard, typeahead and listbox semantics.
 * Public API:   <Select> (Radix Root props + `placeholder`, ARIA props from
 *               FieldWrapper) and <SelectItem value>.
 * Props:        Typed; ≤ 7 conceptual.
 * Variants:     None.
 * States:       closed · open · focus · disabled; selected item shows a check.
 * A11y:         Radix supplies role="combobox"/listbox semantics, typeahead and
 *               focus handling; the trigger accepts id + aria-* from FieldWrapper.
 * Responsive:   Trigger is full-width, 44px tall; the menu scrolls if long.
 * Composition:  `<Select>` holds `<SelectItem>` children. Overlay z-index reads
 *               the token so it sits above content but below modals.
 */
interface SelectProps
  extends ComponentPropsWithoutRef<typeof RadixSelect.Root> {
  placeholder?: string;
  /** id + aria-* forwarded to the trigger (from FieldWrapper). */
  triggerProps?: ComponentPropsWithoutRef<typeof RadixSelect.Trigger>;
  className?: string;
  children: ReactNode;
}

export function Select({
  placeholder = 'Select…',
  triggerProps,
  className,
  children,
  ...rest
}: SelectProps) {
  return (
    <RadixSelect.Root {...rest}>
      <RadixSelect.Trigger
        className={cn(
          INPUT_BASE,
          'flex items-center justify-between gap-2 text-left',
          'data-[placeholder]:text-mute',
          className,
        )}
        {...triggerProps}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <Icon icon={ChevronDown} size="sm" className="text-mute" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'bg-paper border-hairline z-overlay shadow-e2 max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border',
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {children}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof RadixSelect.Item> {
  children: ReactNode;
}

export function SelectItem({ className, children, ...rest }: SelectItemProps) {
  return (
    <RadixSelect.Item
      className={cn(
        'text-ink text-small relative flex cursor-pointer items-center rounded-sm py-2 pr-3 pl-8 outline-none',
        'data-[highlighted]:bg-signal-tint data-[state=checked]:font-medium',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--op-disabled)]',
        className,
      )}
      {...rest}
    >
      <RadixSelect.ItemIndicator className="text-signal absolute left-2 inline-flex">
        <Icon icon={Check} size="sm" />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}
