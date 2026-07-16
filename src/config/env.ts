/**
 * Typed environment access (Sprint 01 §10, Blueprint §18).
 *
 * The single place `process.env` is read. App code imports `env` — never
 * `process.env` directly — so every variable is validated once, has a default,
 * and is typed. A missing required var fails fast at module load, not deep in
 * a request.
 *
 * Only `NEXT_PUBLIC_*` vars are safe to read on the client; those are the only
 * ones surfaced here in Sprint 01.
 */

const APP_ENVS = ['development', 'preview', 'production'] as const;
type AppEnv = (typeof APP_ENVS)[number];

function readAppEnv(): AppEnv {
  // Prefer an explicit override, else derive from Vercel/Node.
  const explicit = process.env.NEXT_PUBLIC_APP_ENV;
  if (explicit && (APP_ENVS as readonly string[]).includes(explicit)) {
    return explicit as AppEnv;
  }
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv && (APP_ENVS as readonly string[]).includes(vercelEnv)) {
    return vercelEnv as AppEnv;
  }
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

function readSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000');
  // Normalise: no trailing slash, so callers can append paths cleanly.
  return raw.replace(/\/$/, '');
}

export const env = {
  /** Deployment environment. */
  appEnv: readAppEnv(),
  /** Canonical site origin, no trailing slash. */
  siteUrl: readSiteUrl(),
  /** True only in a real production deployment. */
  isProduction: readAppEnv() === 'production',
  /** Analytics placeholder — off until wired in a later sprint. */
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
} as const;

export type Env = typeof env;
