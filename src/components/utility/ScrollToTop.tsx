'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';

/**
 * ScrollToTop — a back-to-top button that appears on scroll (Sprint 02 §09).
 *
 * Purpose:      A floating control that fades in after the user scrolls past a
 *               threshold and returns them to the top.
 * Public API:   `threshold`, `className`.
 * Props:        `threshold`; ≤ 7 total.
 * Variants:     None.
 * States:       hidden (above threshold) · visible · hover · focus.
 * A11y:         A labelled IconButton; hidden from the tab order (and AT) while
 *               off-screen so it is not a dead tab stop. Honours reduced motion
 *               via the smooth-scroll global rule.
 * Responsive:   Pinned bottom-right; comfortable touch target.
 * Composition:  Mount once near the app root; self-manages its visibility.
 */
interface ScrollToTopProps {
  /** Scroll distance (px) before the button appears. Default 400. */
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <div
      className={cn(
        'z-nav fixed right-6 bottom-6 transition-opacity duration-[var(--dur-standard)]',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
      aria-hidden={!visible}
    >
      <IconButton
        icon={ArrowUp}
        label="Scroll to top"
        variant="tertiary"
        tabIndex={visible ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="shadow-e2"
      />
    </div>
  );
}
