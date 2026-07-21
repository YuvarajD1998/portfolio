/**
 * SkipNavigation — first tab stop, jumps to main content (Bible §11, S02 §09).
 *
 * Purpose:      The skip link that lets keyboard users bypass the header and
 *               land on the main content — the a11y baseline every page inherits.
 * Public API:   `targetId`, `children`.
 * Props:        `targetId`, `children`; ≤ 7 total.
 * Variants:     None.
 * States:       visually hidden until focused, then appears top-left (see
 *               `.skip-link` in globals.css).
 * A11y:         A real anchor to the `#main-content` landmark; it is (and must
 *               remain) the first focusable element on the page.
 * Responsive:   Fixed position when focused; size-agnostic.
 * Composition:  Mounts at the very top of the app shell, before the header.
 */
interface SkipNavigationProps {
  /** Landmark id to jump to. Default `main-content`. */
  targetId?: string;
  children?: React.ReactNode;
}

export function SkipNavigation({
  targetId = 'main-content',
  children = 'Skip to content',
}: SkipNavigationProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {children}
    </a>
  );
}
