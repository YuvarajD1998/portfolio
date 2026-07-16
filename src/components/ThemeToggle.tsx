'use client';

import { Moon, Sun } from 'lucide-react';

import { Icon } from '@/components/icon';
import { cn } from '@/lib/cn';
import { useTheme } from '@/providers/theme-provider';

/**
 * ThemeToggle — accessible light/dark switch (Sprint 01 §05).
 *
 * Purpose:      Let the visitor switch theme; the switch is the only UI
 *               affordance for the theme system in Sprint 01.
 * Public API:   `className`.
 * Props:        `className`; 1 total.
 * Variants:     None — a single control.
 * States:       Default/hover/focus via classes; focus ring is global. Reflects
 *               the resolved theme through icon + aria-pressed.
 * A11y:         A real <button>; keyboard-operable; labelled with the action;
 *               announces state via aria-pressed. Icon is decorative (label on
 *               the button carries the meaning), so meaning is never colour- or
 *               icon-only (Bible §11).
 * Responsive:   44×44px min touch target (Bible §11).
 * Composition:  Lives in the header; needs a ThemeProvider ancestor.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-sm',
        'text-ink transition-colors duration-[var(--dur-instant)]',
        'hover:bg-sunken',
        className,
      )}
    >
      <Icon icon={isDark ? Sun : Moon} />
    </button>
  );
}
