'use client';

import { Send } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import {
  Alert,
  Button,
  Fade,
  FieldWrapper,
  Link,
  Stack,
  TextInput,
  Textarea,
} from '@/components';
import { contactForm } from '@/config/contact-form';
import { form } from '@/content/contact';

/**
 * ContactForm — the message form, easy and honest (Sprint 12 §05, §06).
 *
 * Purpose:      The approved contact form (P10A freezes its messages, P10 the
 *               architecture). Four fields — name / email / subject / message —
 *               built from Sprint 02 input primitives in a semantic <form>, wired
 *               to the config-driven endpoint (`@/config/contact-form`). It
 *               implements the four states with accessible handling: validation
 *               (aria-describedby errors, aria-invalid, focus to first error), a
 *               loading state (submit busy + disabled, no double-submit), a
 *               success state (frozen confirmation, announced) and a failure
 *               state (frozen error, input preserved, email fallback). Every
 *               message is a single-sourced string from `@/content/contact` (C3);
 *               no backend is invented beyond the approved endpoint (S12 §05).
 * Public API:   No props — reads frozen copy from `@/content/contact` and the
 *               endpoint from `@/config/contact-form`.
 * States:       idle · invalid (per-field errors + summary) · submitting
 *               (aria-busy) · success (Alert + reset) · error (Alert + fallback)
 *               · unavailable (C4 not wired → honest notice + email fallback).
 * A11y:         Semantic <form>; every field labelled via FieldWrapper; errors
 *               tied via aria-describedby and marked aria-invalid; focus moves to
 *               the first invalid field on submit; an aria-live region announces
 *               loading / success / failure. The honeypot is aria-hidden and
 *               out of the tab order. The success state fades in via the shared
 *               Fade primitive (S13 §08) — reduced-motion safe, and the live
 *               region announces it whether or not the animation plays.
 * Responsive:   Single-column stack; inputs full-width & thumb-reachable; the
 *               submit control stays reachable at every width.
 * Composition:  Rendered inside the §05 ContactForm section. The success Alert
 *               keeps the alternative email channel visible (S12 §06).
 */

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const statusId = useId();

  const submitting = status === 'submitting';

  /** Pure validation → the frozen (C3) message per field, or nothing. */
  const validate = (v: typeof values): Errors => {
    const next: Errors = {};
    if (!v.name.trim()) next.name = form.fields.name.requiredError;
    if (!v.email.trim()) next.email = form.fields.email.requiredError;
    else if (!EMAIL_RE.test(v.email.trim()))
      next.email = form.fields.email.formatError;
    if (!v.subject.trim()) next.subject = form.fields.subject.requiredError;
    if (!v.message.trim()) next.message = form.fields.message.requiredError;
    return next;
  };

  const setField = (key: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as the user corrects it (errors re-run on submit).
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  /** Move focus to the first invalid control so keyboard/AT users land on it. */
  const focusFirstError = (errs: Errors) => {
    const order: (keyof Errors)[] = ['name', 'email', 'subject', 'message'];
    const first = order.find((k) => errs[k]);
    if (!first || !formRef.current) return;
    const el = formRef.current.elements.namedItem(
      form.fields[first].name,
    ) as HTMLElement | null;
    el?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return; // no double-submit

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      focusFirstError(nextErrors);
      return;
    }
    setErrors({});

    // Honeypot: a filled decoy means a bot — succeed silently without sending.
    const honeypot = (
      formRef.current?.elements.namedItem(
        contactForm.honeypotField,
      ) as HTMLInputElement | null
    )?.value;
    if (honeypot) {
      setStatus('success');
      setValues({ name: '', email: '', subject: '', message: '' });
      return;
    }

    // C4 — no approved endpoint wired: do not post to a guessed URL. Surface the
    // honest failure state that routes the reader to the email channel.
    if (!contactForm.isConfigured || !contactForm.endpoint) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(contactForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('success');
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  // Success replaces the form with the frozen confirmation; the email channel
  // stays visible so the reader is never stranded (S12 §06).
  if (status === 'success') {
    // Success fades in via the shared Fade primitive (S13 §08) — 200ms, and an
    // instant opacity swap under reduced motion (P09 §06 "instant + text"). The
    // aria-live region announces it regardless of whether motion plays; the
    // confirmation copy carries the meaning, never the animation.
    return (
      <Fade>
        <div aria-live="polite">
          <Alert status="success" title={form.states.successTitle}>
            {form.states.success}
          </Alert>
        </div>
      </Fade>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="max-w-[42ch]"
    >
      <Stack gap={5}>
        <FieldWrapper
          label={form.fields.name.label}
          required
          error={errors.name}
        >
          {(field) => (
            <TextInput
              {...field}
              name={form.fields.name.name}
              value={values.name}
              onChange={(e) => setField('name')(e.target.value)}
              placeholder={form.fields.name.placeholder}
              autoComplete={form.fields.name.autoComplete}
              disabled={submitting}
            />
          )}
        </FieldWrapper>

        <FieldWrapper
          label={form.fields.email.label}
          required
          error={errors.email}
        >
          {(field) => (
            <TextInput
              {...field}
              type="email"
              name={form.fields.email.name}
              value={values.email}
              onChange={(e) => setField('email')(e.target.value)}
              placeholder={form.fields.email.placeholder}
              autoComplete={form.fields.email.autoComplete}
              disabled={submitting}
            />
          )}
        </FieldWrapper>

        <FieldWrapper
          label={form.fields.subject.label}
          required
          error={errors.subject}
        >
          {(field) => (
            <TextInput
              {...field}
              name={form.fields.subject.name}
              value={values.subject}
              onChange={(e) => setField('subject')(e.target.value)}
              placeholder={form.fields.subject.placeholder}
              disabled={submitting}
            />
          )}
        </FieldWrapper>

        <FieldWrapper
          label={form.fields.message.label}
          required
          error={errors.message}
        >
          {(field) => (
            <Textarea
              {...field}
              name={form.fields.message.name}
              value={values.message}
              onChange={(e) => setField('message')(e.target.value)}
              placeholder={form.fields.message.placeholder}
              rows={form.fields.message.rows}
              disabled={submitting}
            />
          )}
        </FieldWrapper>

        {/* Honeypot — a visually-hidden, off-tab decoy. Real users never see or
            fill it; a filled value marks a bot (S12 §05 spam protection). */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${statusId}-hp`}>Do not fill this field</label>
          <input
            id={`${statusId}-hp`}
            type="text"
            name={contactForm.honeypotField}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <Button
            type="submit"
            size="lg"
            leadingIcon={Send}
            loading={submitting}
          >
            {submitting ? form.submitPending : form.submit}
          </Button>
        </div>

        {/* Single polite live region — announces loading / failure to AT.
            (Success is announced by its own region above.) */}
        <div aria-live="polite" id={statusId}>
          {submitting ? (
            <p className="text-mute text-small">{form.states.loading}</p>
          ) : null}
          {status === 'error' ? (
            <Alert status="error" title={form.states.errorTitle}>
              {contactForm.isConfigured
                ? form.states.error
                : form.states.unavailable}
              <Link href={form.fallbackEmail.href}>
                {form.fallbackEmail.label}
              </Link>
              {'.'}
            </Alert>
          ) : null}
        </div>
      </Stack>
    </form>
  );
}
