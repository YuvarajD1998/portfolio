/**
 * SkipLink — first tab stop, jumps to main content (Bible §11).
 *
 * Visually hidden until focused (see `.skip-link` in globals.css), then it
 * appears at the top-left. Targets the `#main-content` landmark the layout
 * renders. A required part of the a11y baseline every page inherits.
 */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
  );
}
