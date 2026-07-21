import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { contactForm } from '@/config/contact-form';
import { form } from '@/content/contact';
import { axe } from '@/tests/axe';

import { ContactForm } from './ContactForm';

/**
 * ContactForm tests (Sprint 12 §06). Exercise the four states and their
 * accessible handling: validation (required + email format, errors tied to
 * fields, focus to the first error), loading, success (frozen confirmation,
 * announced), and failure (frozen error + email fallback, input preserved). The
 * config-driven endpoint (C4) is stubbed at runtime so both the "not yet wired"
 * delivery path and the live POST paths are covered independent of build config.
 * Messages assert against the frozen `form` content, never hardcoded strings.
 */

/** Fill the four required fields with valid values. */
async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/subject/i), 'A role');
  await user.type(
    screen.getByLabelText(/message/i),
    'Hello, I have an opportunity.',
  );
}

// `endpoint`/`isConfigured` are compile-time `as const` but runtime-mutable; a
// mutable view lets a test drive the wired path without a build-time env var.
const mutable = contactForm as unknown as {
  endpoint: string | null;
};
const originalEndpoint = contactForm.endpoint;

afterEach(() => {
  mutable.endpoint = originalEndpoint;
  vi.unstubAllGlobals();
});

describe('ContactForm — validation (§06)', () => {
  it('shows the frozen required-field errors and blocks submission when empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: form.submit }));

    expect(
      screen.getByText(form.fields.name.requiredError),
    ).toBeInTheDocument();
    expect(
      screen.getByText(form.fields.email.requiredError),
    ).toBeInTheDocument();
    expect(
      screen.getByText(form.fields.subject.requiredError),
    ).toBeInTheDocument();
    expect(
      screen.getByText(form.fields.message.requiredError),
    ).toBeInTheDocument();
  });

  it('marks invalid fields aria-invalid and ties the error via aria-describedby', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: form.submit }));

    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    const describedBy = nameInput.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toHaveTextContent(form.fields.name.requiredError);
  });

  it('moves focus to the first invalid field on submit (§06)', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: form.submit }));
    expect(screen.getByLabelText(/name/i)).toHaveFocus();
  });

  it('announces the frozen invalid-submit summary through a live region (S15 §07, SC 3.3.1/4.1.3)', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: form.submit }));
    // The summary is the frozen C3 string, surfaced through a role="status"
    // live region that is mounted from first render (so AT observes it).
    const status = await screen.findByText(form.states.invalidSummary);
    expect(status).toBeInTheDocument();
  });

  it('rejects a malformed email with the frozen format error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/name/i), 'Ada');
    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.type(screen.getByLabelText(/subject/i), 'Hi');
    await user.type(screen.getByLabelText(/message/i), 'A message');
    await user.click(screen.getByRole('button', { name: form.submit }));
    expect(screen.getByText(form.fields.email.formatError)).toBeInTheDocument();
  });
});

describe('ContactForm — delivery states (§06)', () => {
  it('shows the honest "not yet wired" failure + email fallback when no endpoint (C4)', async () => {
    mutable.endpoint = null;
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: form.submit }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(form.states.unavailable.trim());
    // The email fallback is always offered so the reader is never stranded.
    const fallback = screen.getByRole('link', {
      name: form.fallbackEmail.label,
    });
    expect(fallback).toHaveAttribute('href', form.fallbackEmail.href);
  });

  it('posts to the endpoint and shows the frozen confirmation on success', async () => {
    mutable.endpoint = 'https://example.com/contact';
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: form.submit }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://example.com/contact',
        expect.objectContaining({ method: 'POST' }),
      );
    });
    // Success is a status Alert carrying the frozen confirmation string.
    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent(form.states.success);
  });

  it('surfaces the frozen error + email fallback when the request fails — never silent', async () => {
    mutable.endpoint = 'https://example.com/contact';
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 500 } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: form.submit }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(form.states.error.trim());
    expect(
      screen.getByRole('link', { name: form.fallbackEmail.label }),
    ).toBeInTheDocument();
    // Input is preserved so the user can retry (§06).
    expect(screen.getByLabelText(/message/i)).toHaveValue(
      'Hello, I have an opportunity.',
    );
  });

  it('does not post when the honeypot is filled (spam trap, §05)', async () => {
    mutable.endpoint = 'https://example.com/contact';
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    await fillValid(user);
    // A bot fills the visually-hidden decoy.
    const honeypot = container.querySelector<HTMLInputElement>(
      `input[name="${contactForm.honeypotField}"]`,
    )!;
    honeypot.value = 'http://spam.example';
    await user.click(screen.getByRole('button', { name: form.submit }));

    // Silently "succeeds" without ever posting.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(await screen.findByRole('status')).toHaveTextContent(
      form.states.success,
    );
  });
});

describe('ContactForm — automated a11y (S15 §14, gate G2)', () => {
  it('has no axe violations in its idle state', async () => {
    const { container } = render(<ContactForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations after an invalid submit surfaces field errors', async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: form.submit }));
    // Errors are now shown, tied via aria-describedby + aria-invalid, and the
    // live-region summary is present — the whole error state must stay clean.
    expect(await axe(container)).toHaveNoViolations();
  });
});
