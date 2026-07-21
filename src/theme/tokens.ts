/**
 * Machine-readable mirror of the design tokens (Design Bible §15).
 *
 * The CSS variables in `styles/tokens.css` are the runtime source of truth;
 * this module exposes the same names to TypeScript for code that needs a token
 * value outside CSS (e.g. motion presets, canvas, meta theme-color). It never
 * duplicates a *raw* value that a component should read — components read the
 * CSS variable via Tailwind. Import a `var(--token)` string, not a hex.
 *
 * @see styles/tokens.css — the authoritative declarations.
 */

/** A CSS `var()` reference to a token — the only value form components use. */
export const token = {
  // Color
  paper: 'var(--paper)',
  surface: 'var(--surface)',
  sunken: 'var(--sunken)',
  hairline: 'var(--hairline)',
  ink: 'var(--ink)',
  graphite: 'var(--graphite)',
  mute: 'var(--mute)',
  signal: 'var(--signal)',
  signalTint: 'var(--signal-tint)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  info: 'var(--info)',

  // Motion
  durInstant: 'var(--dur-instant)',
  durMicro: 'var(--dur-micro)',
  durPage: 'var(--dur-page)',
  durStandard: 'var(--dur-standard)',
  durEntrance: 'var(--dur-entrance)',
  durReveal: 'var(--dur-reveal)',
  ease: 'var(--ease)',
  easeEnter: 'var(--ease-enter)',
  easeExit: 'var(--ease-exit)',
} as const;

/**
 * Motion timing in seconds — Motion (Framer) takes numeric seconds, not CSS
 * strings, so these are the one place the durations are mirrored numerically.
 * Kept in lockstep with the `--dur-*` tokens by hand; changing one changes
 * both (Bible §10).
 */
export const duration = {
  instant: 0.1,
  micro: 0.16,
  page: 0.2, // page transition (P09 §06)
  standard: 0.24,
  entrance: 0.36,
  reveal: 0.4, // section reveal (P09 §06)
} as const;

/** Stagger step for sequenced content, in seconds (Bible §10; M1 default). */
export const staggerStep = 0.05;

/** The single default easing curve as a cubic-bezier array (Bible §10). */
export const easing = [0.2, 0.8, 0.2, 1] as const;

export type TokenName = keyof typeof token;
