/**
 * Accessibility helpers (Sprint 01 §08, Bible §11).
 *
 * Small, framework-agnostic utilities that make the a11y baseline reusable
 * rather than re-derived per component. No DOM side effects here — these
 * compute values; hooks (in `@/hooks`) own any live behaviour.
 */

/** Relative luminance of an sRGB hex colour, per WCAG. */
function relativeLuminance(hex: string): number {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  const channels = [0, 2, 4].map((i) => {
    const value = parseInt(full.slice(i, i + 2), 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  }) as [number, number, number];

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/**
 * WCAG contrast ratio between two hex colours (1–21).
 * Used to validate token pairings against the AA floor (Bible §11).
 *
 * @example
 * contrastRatio('#17150F', '#FAF8F4') // ≈ 15
 */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Text size class for the AA large-text threshold (18.66px bold / 24px). */
export type TextScale = 'normal' | 'large';

/** Whether a foreground/background pair clears WCAG AA for the given scale. */
export function meetsContrastAA(
  foreground: string,
  background: string,
  scale: TextScale = 'normal',
): boolean {
  const ratio = contrastRatio(foreground, background);
  return scale === 'large' ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Build the props for a visually-hidden but screen-reader-available element.
 * Pair with the `.sr-only` utility in globals.css.
 */
export const visuallyHidden = { className: 'sr-only' } as const;

/**
 * Mark a decorative element as hidden from assistive tech (Bible §11:
 * decorative marks are aria-hidden).
 */
export const decorative = { 'aria-hidden': true } as const;
