import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Disclosure } from './Disclosure';

/**
 * Disclosure tests (Sprint 07 §11). The primitive must expand/collapse from the
 * keyboard, keep collapsed content in the DOM (crawlable), auto-open on a deep
 * link, and default open under reduced motion — reading is never gated on an
 * interaction (S07 §11 RULE, §21).
 */

afterEach(() => {
  window.location.hash = '';
  vi.unstubAllGlobals();
});

describe('Disclosure', () => {
  it('renders a native <summary> control that toggles the panel', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure summary="Show the weights">
        <p>Skill coverage 65%.</p>
      </Disclosure>,
    );
    const trigger = screen.getByText('Show the weights');
    const summary = trigger.closest('summary')!;
    const details = trigger.closest('details')!;
    // The trigger IS a native <summary> — keyboard operability (Enter/Space) is
    // inherited from the element; activating it toggles the panel.
    expect(summary.tagName).toBe('SUMMARY');
    expect(details.open).toBe(false);
    await user.click(summary);
    expect(details.open).toBe(true);
  });

  it('keeps collapsed content in the DOM (crawlable, not fetched away)', () => {
    render(
      <Disclosure summary="More detail">
        <p>Hidden-from-the-eye but present in the DOM.</p>
      </Disclosure>,
    );
    // Present even while collapsed — density is hidden, not substance.
    expect(
      screen.getByText('Hidden-from-the-eye but present in the DOM.'),
    ).toBeInTheDocument();
  });

  it('auto-opens when the URL hash targets its id (deep link)', () => {
    window.location.hash = '#matching-depth';
    render(
      <Disclosure id="matching-depth" summary="Matching detail">
        <p>The nine phases.</p>
      </Disclosure>,
    );
    const details = screen
      .getByText('Matching detail')
      .closest('details')! as HTMLDetailsElement;
    expect(details.open).toBe(true);
  });

  it('defaults open under prefers-reduced-motion', () => {
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
          onchange: null,
        }) as unknown as MediaQueryList,
    );
    render(
      <Disclosure summary="Depth">
        <p>Always readable when motion is reduced.</p>
      </Disclosure>,
    );
    const details = screen
      .getByText('Depth')
      .closest('details')! as HTMLDetailsElement;
    expect(details.open).toBe(true);
  });
});
