import { env } from '@/config/env';

/**
 * Contact-form delivery configuration (Sprint 12 §05; Blueprint P10).
 *
 * The Frontend Engineering Blueprint places the "contact endpoint" in the
 * `config/` layer (P10 §folder-map) and names the approved form architecture:
 * a `ContactForm` posting to a configured endpoint, with `aria-describedby`
 * errors, live-region announcements and disabled-until-valid submit (P10 §a11y).
 * This module is that endpoint's single source — the ARCHITECTURE is approved,
 * the endpoint VALUE is not yet frozen (blocker C4).
 *
 * C4 gate. The Blueprint does NOT specify a provider or URL, so no endpoint is
 * invented in code (CLAUDE.md golden rule; S12 §05 HONEST). While `endpoint` is
 * null the form ships against the APPROVED DELIVERY PATH ONLY — every field, the
 * validation, the four accessible states and the email fallback all work and are
 * testable — and submission resolves to the honest failure state that routes the
 * reader to the email channel, rather than posting to a guessed URL. The endpoint
 * is wired by setting `NEXT_PUBLIC_CONTACT_ENDPOINT` once the content/config owner
 * supplies the approved provider; nothing else on the page changes.
 */
export const contactForm = {
  /**
   * The approved POST target. `null` until C4 is resolved via
   * `NEXT_PUBLIC_CONTACT_ENDPOINT`. A non-null value flips the form from the
   * honest "not yet wired" delivery path to a real submission — no other change.
   */
  endpoint: readEndpoint(),
  /** True only when a real, approved endpoint is configured (C4 resolved). */
  get isConfigured(): boolean {
    return Boolean(this.endpoint);
  },
  /**
   * Honeypot field name — a zero-JS spam trap that is part of the approved
   * delivery path (an accessible, visually-hidden decoy no human fills). It is
   * inert content, not a new backend, so it ships regardless of C4.
   */
  honeypotField: 'company_website',
} as const;

/** Read the approved endpoint from env; never fabricate a provider (C4). */
function readEndpoint(): string | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  return raw && raw.trim().length > 0 ? raw.trim() : null;
}

/** Re-exported so callers can note the endpoint tracks the build environment. */
export const contactFormEnv = env.appEnv;
