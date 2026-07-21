import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import {
  callToAction,
  intro,
  journey,
  philosophy,
  values,
} from '@/content/about';

import AboutPage from './page';

/**
 * About page tests (Sprint 05 §14).
 *
 * Covers the acceptance surface observable in jsdom: single-<h1> hierarchy, the
 * approved section order, the frozen identity line, the accessible career
 * timeline, the value set rendered through the shared components, the CTA
 * targets (all real routes), landmark labelling, and that no placeholder or
 * contradicted-fact copy leaks in. Responsive layout, theme rendering and axe
 * are verified in review / the browser (Sprint 05 §12–§13) — not in jsdom.
 */

// motion's `whileInView` reaches for IntersectionObserver; jsdom omits it.
beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal('IntersectionObserver', IO);
});

describe('AboutPage', () => {
  it('renders exactly one <h1> — the introduction heading (heading hierarchy)', () => {
    render(<AboutPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(intro.title);
  });

  it('renders every approved section, in the approved order', () => {
    render(<AboutPage />);
    const h2s = screen
      .getAllByRole('heading', { level: 2 })
      .map((el) => el.textContent);
    expect(h2s).toEqual([
      journey.title,
      philosophy.title,
      'Engineering in service of users.',
      values.title,
      'How the work happens with others.',
      'Staying sharp on purpose.',
      callToAction.title,
    ]);
  });

  it('renders the frozen professional identity line verbatim', () => {
    render(<AboutPage />);
    expect(screen.getByText(intro.identity)).toBeInTheDocument();
  });

  it('renders the career journey as an accessible ordered list (Sprint 05 §04)', () => {
    render(<AboutPage />);
    const journeyHeading = screen.getByRole('heading', { name: journey.title });
    const section = journeyHeading.closest('section')!;
    const list = within(section).getByRole('list');
    expect(list.tagName).toBe('OL');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(journey.chapters.length);
    // Growth-not-dates: markers are chapter labels, no duplicated Experience dates.
    expect(
      within(section).getByText('AI product development'),
    ).toBeInTheDocument();
    expect(section.textContent).not.toMatch(/\b20\d{2}\b/);
  });

  it('renders exactly the frozen core-value set (neither padded nor trimmed)', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { name: values.title });
    const section = heading.closest('section')!;
    for (const value of values.items) {
      expect(
        within(section).getByRole('heading', { name: value.title }),
      ).toBeInTheDocument();
    }
    // No extra value cards beyond the frozen set.
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(
      values.items.length,
    );
  });

  it('renders the CTA links, all pointing at real existing routes', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { name: callToAction.title });
    const section = heading.closest('section')!;
    for (const link of callToAction.links) {
      expect(
        within(section).getByRole('link', { name: link.label }),
      ).toHaveAttribute('href', link.href);
    }
    // The Transpahire CTA points at the flagship case study.
    expect(
      within(section).getByRole('link', {
        name: /read the transpahire case study/i,
      }),
    ).toHaveAttribute('href', '/projects/transpahire');
  });

  it('does not repeat GitHub in the CTA — it lives in the shell footer (Sprint 05 §10)', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { name: callToAction.title });
    const section = heading.closest('section')!;
    expect(
      within(section).queryByRole('link', { name: /github/i }),
    ).not.toBeInTheDocument();
  });

  it('does not contradict the frozen owner facts (no P08-mockup fiction)', () => {
    const { container } = render(<AboutPage />);
    // Corrected on the homepage; must not resurface here.
    expect(container.textContent).not.toMatch(/ten years|10 years/i);
    expect(container.textContent).not.toMatch(/founding engineer/i);
    expect(container.textContent).not.toMatch(/fintech co/i);
  });

  it('has no placeholder or lorem-ipsum content (Sprint 05 A8)', () => {
    const { container } = render(<AboutPage />);
    expect(container.textContent).not.toMatch(/lorem ipsum/i);
    expect(container.textContent).not.toMatch(/placeholder/i);
    expect(container.textContent).not.toMatch(/content required/i);
    expect(container.textContent).not.toMatch(/\btbd\b/i);
  });

  it('labels each section region by its heading (landmark a11y)', () => {
    const { container } = render(<AboutPage />);
    const sections = container.querySelectorAll('section[aria-labelledby]');
    // 8 sections, each labelled by a heading that actually exists in it.
    expect(sections.length).toBe(8);
    sections.forEach((section) => {
      const id = section.getAttribute('aria-labelledby');
      expect(id).toBeTruthy();
      const heading = section.querySelector(`#${CSS.escape(id!)}`);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toMatch(/^H[12]$/);
    });
  });
});
