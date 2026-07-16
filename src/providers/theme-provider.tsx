'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_PREFERENCE,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  isThemePreference,
  type Theme,
  type ThemePreference,
} from '@/theme/config';

interface ThemeContextValue {
  /** The user's stored choice: 'light' | 'dark' | 'system'. */
  preference: ThemePreference;
  /** The theme actually applied right now (system resolved to a concrete one). */
  resolvedTheme: Theme;
  /** Set an explicit preference; persists to localStorage. */
  setPreference: (preference: ThemePreference) => void;
  /** Convenience toggle between light and dark (drops 'system'). */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolve(preference: ThemePreference): Theme {
  return preference === 'system' ? systemTheme() : preference;
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

/**
 * Owns theme state for the whole app (Sprint 01 §05).
 *
 * A single provider is the only home for theme state. Components never read a
 * theme flag — they read tokens that swap under `[data-theme]`. Responsibilities:
 *   - hydrate the preference from localStorage (falling back to the default);
 *   - apply the resolved theme to <html>;
 *   - track the system setting live, so a 'system' preference follows the OS;
 *   - persist any explicit choice.
 *
 * The pre-hydration script (theme-script.ts) has already set the correct
 * attribute before this mounts, so there is no flash.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(DEFAULT_PREFERENCE);
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('light');

  // Hydrate from storage once on mount.
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const initial = isThemePreference(stored) ? stored : DEFAULT_PREFERENCE;
    setPreferenceState(initial);
    setResolvedTheme(resolve(initial));
  }, []);

  // Follow the system setting while preference is 'system'.
  useEffect(() => {
    if (preference !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const next = systemTheme();
      setResolvedTheme(next);
      applyTheme(next);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolvedTheme, setPreference, toggleTheme }),
    [preference, resolvedTheme, setPreference, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Access theme state. Throws outside a ThemeProvider — a wiring bug, loud. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return ctx;
}
