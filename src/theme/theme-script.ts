import {
  DEFAULT_PREFERENCE,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from '@/theme/config';

/**
 * Pre-hydration theme script (Blueprint §06, risk R-04 — FOUC).
 *
 * Injected into <head> and run synchronously BEFORE first paint, so the
 * correct `data-theme` is on <html> before any pixel renders. Resolves the
 * stored preference (or the system setting) and writes the attribute. Kept as
 * a stringified IIFE because it must execute inline, ahead of React.
 *
 * The literals are duplicated into the string on purpose: the values are
 * interpolated from the config constants so there is still one source of truth.
 */
export const themeScript = `(function(){try{
var key=${JSON.stringify(THEME_STORAGE_KEY)};
var attr=${JSON.stringify(THEME_ATTRIBUTE)};
var stored=localStorage.getItem(key);
var pref=stored||${JSON.stringify(DEFAULT_PREFERENCE)};
var theme=pref;
if(pref==="system"){
  theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}
document.documentElement.setAttribute(attr,theme);
}catch(e){
document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)},"light");
}})();`;
