'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

import { Icon } from '@/components/icons';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

/**
 * Disclosure — an accessible expand/collapse depth panel (Sprint 07 §11).
 *
 * Purpose:      The progressive-disclosure primitive the flagship case study
 *               leans on: a recruiter reads the summary layer straight through;
 *               an engineering manager expands a panel for the depth (weights,
 *               enums, cascades, guard rules). Built on the NATIVE
 *               `<details>/<summary>` element so keyboard operation, the
 *               open/closed state and content-in-DOM are inherited, not
 *               re-implemented.
 * Public API:   `summary`, `children`, `id`, `defaultOpen`, `className`.
 * Props:        Typed; ≤ 7 total.
 * Variants:     None — one depth-panel treatment.
 * States:       collapsed → expanded; the chevron rotates on `[open]`.
 * A11y:         `<summary>` is a real, focusable, keyboard-operable control; the
 *               native element exposes expanded/collapsed to AT. Collapsed
 *               content stays in the DOM (crawlable, findable) — density is
 *               hidden from the eye, never substance from crawlers or AT
 *               (S07 §11 RULE).
 * Responsive:   Full-width block; content wraps. Size-agnostic.
 * Composition:  Beneath a section's summary prose; the depth detail is children.
 *
 * Forced-open rules (S07 §11, §21):
 *   - Under `prefers-reduced-motion` and when PRINTING, panels default open so
 *     reading and deep detail are never gated behind an interaction/motion.
 *   - A deep link whose hash targets this panel's `id` (or a `#id` nested
 *     inside it) auto-opens it, so an anchored jump lands on visible content.
 */
interface DisclosureProps {
  /** The always-visible trigger label (the "more detail" affordance). */
  summary: ReactNode;
  children: ReactNode;
  /** Stable id so a deep link (`#id`) can target and auto-open the panel. */
  id?: string;
  /** Start expanded regardless of viewport (e.g. a key panel). */
  defaultOpen?: boolean;
  className?: string;
}

export function Disclosure({
  summary,
  children,
  id,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const reactId = useId();
  const panelId = id ?? reactId;
  const ref = useRef<HTMLDetailsElement>(null);
  const reducedMotion = useReducedMotion();
  const [forcedOpen, setForcedOpen] = useState(false);

  // Deep-link: open when the URL hash targets this panel or an element inside
  // it. Runs on mount and on every hashchange so back/forward works too.
  useEffect(() => {
    const openIfTargeted = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      if (hash === panelId) {
        setForcedOpen(true);
        return;
      }
      // A hash pointing at content nested inside this panel also opens it.
      const el = ref.current;
      const target = document.getElementById(hash);
      if (el && target && el.contains(target)) setForcedOpen(true);
    };

    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, [panelId]);

  // Printing must never hide substance: force every panel open before print,
  // restore the user's state afterwards.
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    const before = () => setPrinting(true);
    const after = () => setPrinting(false);
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const open = defaultOpen || forcedOpen || reducedMotion || printing;

  return (
    <details
      ref={ref}
      id={panelId}
      open={open || undefined}
      className={cn(
        'border-hairline group scroll-mt-[calc(var(--spacing-header)+var(--space-8))] rounded-sm border',
        className,
      )}
    >
      <summary
        className={cn(
          'text-ink flex cursor-pointer list-none items-center gap-2 px-4 py-3',
          'text-label font-mono tracking-[0.12em] uppercase',
          // Focus ring comes from the global :focus-visible (2px Signal, 2px offset).
          'rounded-sm',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <Icon
          icon={ChevronRight}
          size="sm"
          className={cn(
            'text-mute shrink-0 transition-transform duration-[var(--dur-micro)] ease-[var(--ease-datum)]',
            'group-open:rotate-90 motion-reduce:transition-none',
          )}
        />
        <span>{summary}</span>
      </summary>
      <div className="border-hairline text-graphite text-small border-t px-4 py-4 leading-[1.6]">
        {children}
      </div>
    </details>
  );
}
