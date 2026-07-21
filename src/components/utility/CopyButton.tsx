'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IconButton } from '@/components/ui';

/**
 * CopyButton — copy text to the clipboard with feedback (Sprint 02 §09).
 *
 * Purpose:      A small icon button that copies a given string and briefly
 *               confirms — used by CodeBlock and anywhere a value is copyable.
 * Public API:   `value`, `label`, `size`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     Inherits IconButton sizing.
 * States:       idle (copy icon) → copied (check icon, ~1.5s) → idle. The state
 *               is announced via the button label, not colour alone.
 * A11y:         A labelled IconButton; the label flips to "Copied" so screen
 *               readers hear the result. Falls back silently if clipboard is
 *               unavailable.
 * Responsive:   Fixed square from the icon scale.
 * Composition:  Sits in a CodeBlock header or beside a copyable value.
 */
interface CopyButtonProps {
  value: string;
  /** Idle label; the copied state announces "Copied". */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CopyButton({
  value,
  label = 'Copy to clipboard',
  size = 'sm',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  // Track the reset timer so it is cancelled on unmount — no state update on an
  // unmounted component, nothing left pending (S16 §12).
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context / denied) — no-op, no throw.
    }
  }, [value]);

  return (
    <IconButton
      icon={copied ? Check : Copy}
      label={copied ? 'Copied' : label}
      onClick={onCopy}
      size={size}
      variant="ghost"
    />
  );
}
