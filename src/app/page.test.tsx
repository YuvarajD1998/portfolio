import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { contact, hero } from '@/content/home';

import HomePage from './page';

/**
 * Homepage tests (Sprint 04 §14).
 *
 * Covers the acceptance surface that can be asserted in jsdom: rendering of
 * every section, the single-<h1> heading hierarchy, the frozen hero copy, CTA
 * navigation targets, and that no placeholder or contradicted-fact copy leaks
 * in. Responsive layout, theme rendering and axe are verified in review /
 * the browser (Sprint 04 §13–§14) — they are not observable in jsdom.
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

describe('HomePage', () => {
  it('renders exactly one <h1> — the hero thesis (heading hierarchy)', () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(hero.headline);
  });

  it('renders every approved section, in the approved order', () => {
    render(<HomePage />);
    const h2s = screen
      .getAllByRole('heading', { level: 2 })
      .map((el) => el.textContent);
    expect(h2s).toEqual([
      'Hiring that understands meaning.',
      'Three portals. One system of record.',
      'The blueprint, drawn to scale.',
      'AI that reads like a recruiter.',
      'Engineering, as principles.',
      'Grouped by capability. No progress bars.',
      'A career, read as increasing scope.',
      'The track record, briefly.',
      "If you're building something ambitious, let's talk.",
    ]);
  });

  it('renders the frozen hero copy and both CTAs with correct targets', () => {
    render(<HomePage />);
    expect(screen.getByText(hero.role)).toBeInTheDocument();
    // Hero owns the single <h1>; its primary CTA opens the case study.
    const h1 = screen.getByRole('heading', { level: 1 });
    const heroSection = h1.closest('section')!;
    expect(
      within(heroSection).getByRole('link', { name: hero.primaryCta.label }),
    ).toHaveAttribute('href', '/projects/transpahire');
    expect(
      within(heroSection).getByRole('link', { name: hero.secondaryCta.label }),
    ).toHaveAttribute('href', '/projects');
  });

  it('links the flagship section into the Transpahire case study', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('link', { name: /read the case study/i }),
    ).toHaveAttribute('href', '/projects/transpahire');
  });

  it('exposes the frozen contact facts in the final CTA', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('link', { name: new RegExp(contact.email) }),
    ).toHaveAttribute('href', `mailto:${contact.email}`);
    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', contact.github);
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('renders the frozen career facts, not the P08 mockup narrative', () => {
    render(<HomePage />);
    // Real employers / projects from the Content Bible are present.
    expect(screen.getByText('BlueRise')).toBeInTheDocument();
    expect(screen.getByText('RATTS')).toBeInTheDocument();
    // Contradicted mockup facts must not appear.
    expect(screen.queryByText(/Fintech Co/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/founding engineer/i)).not.toBeInTheDocument();
  });

  it('has no placeholder or lorem-ipsum content (Sprint 04 A8)', () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toMatch(/lorem ipsum/i);
    expect(container.textContent).not.toMatch(/placeholder/i);
    expect(container.textContent).not.toMatch(/content required/i);
  });

  it('renders featured project cards as whole-card links (keyboard-reachable)', () => {
    render(<HomePage />);
    // The whole card is one link, so each project name is inside an anchor.
    for (const name of [
      'BlueRise',
      'RATTS',
      'ANZ Banking',
      'Playwright Automation',
    ]) {
      const heading = screen.getByRole('heading', { name });
      const link = heading.closest('a');
      expect(link).not.toBeNull();
      expect(link).toHaveAttribute('href', '/projects');
    }
  });

  it('labels each section region by its heading (landmark a11y)', () => {
    const { container } = render(<HomePage />);
    const sections = container.querySelectorAll('section[aria-labelledby]');
    // 10 sections, each labelled by a heading that actually exists in it.
    expect(sections.length).toBe(10);
    sections.forEach((section) => {
      const id = section.getAttribute('aria-labelledby');
      expect(id).toBeTruthy();
      const heading = section.querySelector(`#${CSS.escape(id!)}`);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toMatch(/^H[12]$/);
    });
  });
});
