import { type ReactNode } from 'react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/cn';

/**
 * Header — the sticky top-bar shell (Bible §09, Sprint 02 §05).
 *
 * Purpose:      The slim, hairline-underlined top region that holds a logo,
 *               navigation and actions. Unwired: it provides the shell and slots;
 *               the caller composes Logo / NavigationBar / actions into it.
 * Public API:   `left`, `center`, `right`, `sticky`, `className`.
 * Props:        Typed slots; ≤ 7 total.
 * Variants:     `sticky` (default) pins the bar; non-sticky scrolls away.
 * States:       Static shell; children carry their own states.
 * A11y:         Renders the `<header>` landmark; a translucent, blurred Paper
 *               bar keeps text contrast over scrolled content.
 * Responsive:   Fixed height; slots reflow. Pair the right slot with a NavToggle
 *               below md and a NavigationBar at md+.
 * Composition:  Slots are free content — no route wiring here.
 */
interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  sticky?: boolean;
  className?: string;
}

export function Header({
  left,
  center,
  right,
  sticky = true,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'border-hairline bg-paper/80 z-nav w-full border-b backdrop-blur',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">{left}</div>
          {center ? <div className="flex items-center">{center}</div> : null}
          <div className="flex items-center gap-3">{right}</div>
        </div>
      </Container>
    </header>
  );
}
