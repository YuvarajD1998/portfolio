'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * ScrollIndicator — a top reading-progress bar (Sprint 02 §09).
 *
 * Purpose:      A thin bar pinned to the top that fills as the page scrolls —
 *               a lightweight sense of reading progress.
 * Public API:   `className`.
 * Props:        `className`; ≤ 7 total.
 * Variants:     None.
 * States:       Width tracks scroll position (0→100%).
 * A11y:         Decorative by default (`aria-hidden`) — progress is ambient, not
 *               essential information; nothing depends on perceiving it.
 * Responsive:   Full-width; fixed thin height.
 * Composition:  Mount once at the app root; self-manages from scroll.
 */
export function ScrollIndicator({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn('z-toast fixed inset-x-0 top-0 h-0.5', className)}
    >
      <div
        className="bg-signal h-full origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
