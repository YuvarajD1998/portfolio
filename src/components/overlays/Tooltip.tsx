'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Tooltip — a hover/focus hint on Radix Tooltip (Sprint 02 §08).
 *
 * Purpose:      A brief label revealed on hover or keyboard focus — never the
 *               only place critical information lives.
 * Public API:   <TooltipProvider> (mount once) · <Tooltip content>.
 * Props:        `content` (required), `side`, `children` (the trigger); ≤ 7.
 * Variants:     Positioning via Radix `side`.
 * States:       hidden · shown (on hover AND focus, per Radix — keyboard users
 *               get it too).
 * A11y:         Radix links the tooltip to its trigger and shows it on focus as
 *               well as hover; the hint is supplementary, not sole-source info.
 * Responsive:   Collision-aware; delay from the provider.
 * Composition:  Wrap the app once in <TooltipProvider>; use <Tooltip> per hint.
 */
export const TooltipProvider = RadixTooltip.Provider;

interface TooltipProps {
  content: ReactNode;
  side?: RadixTooltip.TooltipContentProps['side'];
  children: ReactNode;
}

export function Tooltip({ content, side = 'top', children }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={6}
          className={cn(
            'datum-popover-in bg-ink text-paper z-overlay text-small shadow-e2 max-w-xs rounded-md px-2.5 py-1.5 font-sans leading-snug',
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-[var(--ink)]" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
