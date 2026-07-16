import { Hanken_Grotesk, IBM_Plex_Mono, Newsreader } from 'next/font/google';

/**
 * Font strategy (Sprint 01 §06, Bible §04).
 *
 * Three families, each with a fixed job and only its declared weights:
 *   - Newsreader (display/heading) — 400/500.
 *   - Hanken Grotesk (body/UI)     — 400/500/600/700.
 *   - IBM Plex Mono (mono/label)   — 400/500.
 *
 * All load via next/font: self-hosted, subset to Latin, `display: swap` (no
 * FOIT), and exposed as CSS variables that `styles/tokens.css` reads. Loading
 * is optimised for zero layout shift — next/font sizes the fallback to match.
 */

export const fontDisplay = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});

export const fontUi = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hanken',
});

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

/** All three font variable class names, for the <html> element. */
export const fontVariables = [
  fontDisplay.variable,
  fontUi.variable,
  fontMono.variable,
].join(' ');
