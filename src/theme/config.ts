/**
 * Theme configuration (Sprint 01 §05, Blueprint §06).
 *
 * Light is the default, canonical mode; dark is the deliberate companion.
 * Adding a third theme is a new token block in tokens.css plus one entry
 * here — never a component change.
 */

/** The concrete themes the app can render. */
export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

/** What the user can choose: a concrete theme, or "follow the system". */
export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];

/** Default when the user has expressed no preference. */
export const DEFAULT_PREFERENCE: ThemePreference = 'system';

/** localStorage key the preference persists under. */
export const THEME_STORAGE_KEY = 'datum-theme';

/** The attribute set on <html> that the token layer keys off. */
export const THEME_ATTRIBUTE = 'data-theme';

export function isThemePreference(value: unknown): value is ThemePreference {
  return (
    typeof value === 'string' &&
    (THEME_PREFERENCES as readonly string[]).includes(value)
  );
}
