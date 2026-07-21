'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { cn } from '@/lib/cn';

/**
 * Dialog — a centred modal on Radix Dialog (Bible §13, Sprint 02 §08).
 *
 * Purpose:      A focus-trapped modal for confirmations and short flows. Radix
 *               owns focus trapping, scroll lock, Esc/overlay dismissal and
 *               labelling; Datum owns the visual shell only.
 * Public API:   <Dialog> (Radix Root) · <DialogTrigger> · <DialogContent
 *               title description> · <DialogClose>.
 * Props:        content — `title` (required), `description`; ≤ 7 total.
 * Variants:     None — one centred modal (side sheets use Drawer).
 * States:       closed · open (enter/exit animation, reduced-motion honoured).
 * A11y:         Radix wires aria-labelledby/aria-describedby from Title/
 *               Description; focus is trapped and returned to the trigger. The
 *               close button carries a label. NEVER re-implemented by hand.
 * Responsive:   Caps to a readable width; scrolls internally if tall.
 * Composition:  Compose trigger + content; body is free children.
 */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

interface DialogContentProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixDialog.Content>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function DialogContent({
  title,
  description,
  className,
  children,
  ...rest
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          'datum-overlay-in z-overlay fixed inset-0 bg-[var(--scrim)]',
        )}
      />
      <RadixDialog.Content
        className={cn(
          'datum-dialog-in bg-paper border-hairline z-modal shadow-e3 fixed top-1/2 left-1/2 w-[calc(100%-var(--space-8))] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border p-6',
          'focus:outline-none',
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
            aria-label="Close dialog"
            className="text-mute hover:text-ink -mt-3 -mr-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm transition-colors"
          >
            <Icon icon={X} />
          </RadixDialog.Close>
        </div>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
