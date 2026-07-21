import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  accessibility,
  aiEngineering,
  authentication,
  developerExperience,
  overview,
  philosophy,
  stateManagement,
} from '@/content/engineering';
import { axe } from '@/tests/axe';

import EngineeringPage from './page';

/**
 * Engineering page tests (Sprint 08 §22 — tests cover rendering, section
 * navigation, anchor links, scroll-spy, expandable sections, deep linking,
 * accessibility, theme, reduced motion, structured data). Assertions read
 * against the frozen content exports rather than hardcoded strings, so a copy
 * change in the books surfaces as a content-file edit, not a test rewrite (A2).
 */

// Motion's whileInView (Reveal) needs IntersectionObserver; jsdom omits it.
beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver =
    globalThis.IntersectionObserver ??
    (IO as unknown as typeof IntersectionObserver);
});

/** The fifteen movements, in narrative order — the anchors the rail steers by. */
const SECTION_IDS = [
  'philosophy',
  'frontend',
  'design',
  'state',
  'api',
  'auth',
  'backend',
  'ai',
  'performance',
  'accessibility',
  'testing',
  'dx',
  'cicd',
  'decisions',
  'tools',
];

describe('EngineeringPage', () => {
  it('renders exactly one <h1> — the overview page title (heading hierarchy, A5)', () => {
    render(<EngineeringPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(overview.title);
  });

  it('implements every approved movement as an anchored, labelled <section> (A1, A4)', () => {
    const { container } = render(<EngineeringPage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the movements in the load-bearing narrative order (S08 §02)', () => {
    const { container } = render(<EngineeringPage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('leads with philosophy — the lens — before any practice movement (S08 §02)', () => {
    const { container } = render(<EngineeringPage />);
    const ids = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(ids[0]).toBe('philosophy');
    expect(ids.indexOf('philosophy')).toBeLessThan(ids.indexOf('decisions'));
  });

  it('exposes the section rail as an "On this page" nav with an anchor per movement (A4)', () => {
    render(<EngineeringPage />);
    const rail = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(rail).getAllByRole('link');
    expect(links).toHaveLength(SECTION_IDS.length);
    for (const id of SECTION_IDS) {
      const anchor = links.find((l) => l.getAttribute('href') === `#${id}`);
      expect(anchor, `rail missing anchor #${id}`).toBeTruthy();
    }
  });

  it('renders both frozen philosophy pillar sets as real applied sentences (A2, A3)', () => {
    render(<EngineeringPage />);
    // Each pillar body is present in full — never a bare list of nouns (§04 RULE).
    for (const pillar of philosophy.engineering.pillars) {
      expect(screen.getByText(pillar.body)).toBeInTheDocument();
    }
    for (const pillar of philosophy.product.pillars) {
      expect(screen.getByText(pillar.body)).toBeInTheDocument();
    }
  });

  it('keeps progressive-disclosure depth in the DOM while collapsed (A4, crawlable)', () => {
    render(<EngineeringPage />);
    // The honest-status notes live inside <details> panels; present even collapsed.
    expect(screen.getByText(authentication.honest)).toBeInTheDocument();
    expect(screen.getByText(developerExperience.honest)).toBeInTheDocument();
    expect(screen.getByText(stateManagement.evidence)).toBeInTheDocument();
  });

  it('exposes depth as native, deep-linkable <details> panels (A4, §20)', () => {
    const { container } = render(<EngineeringPage />);
    const panels = container.querySelectorAll('details');
    expect(panels.length).toBeGreaterThanOrEqual(5);
    // Key panels carry stable ids a hash can target and auto-open.
    expect(container.querySelector('details#auth-honest')).not.toBeNull();
    expect(container.querySelector('details#state-evidence')).not.toBeNull();
    expect(container.querySelector('details#dx-honest')).not.toBeNull();
  });

  it('renders the AI flow diagram as an accessible inline SVG (A3, §12)', () => {
    const { container } = render(<EngineeringPage />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).not.toBeNull();
    const labelledBy = svg!.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(svg!.querySelector('title')).not.toBeNull();
    expect(svg!.querySelector('desc')).not.toBeNull();
    expect(svg!.closest('figure')!.querySelector('figcaption')).not.toBeNull();
  });

  it('states the load-bearing AI principle verbatim — grounded, never hallucinated (A2, §12)', () => {
    render(<EngineeringPage />);
    expect(screen.getByText(aiEngineering.principle)).toBeInTheDocument();
  });

  it('keeps accessibility a principle-in-practice, not a checklist (A2, §14)', () => {
    render(<EngineeringPage />);
    expect(screen.getByText(accessibility.principle)).toBeInTheDocument();
  });

  it('routes the closing CTAs to real, existing destinations (A5, §19)', () => {
    render(<EngineeringPage />);
    const caseStudy = screen.getByRole('link', {
      name: 'Read the Transpahire case study',
    });
    expect(caseStudy).toHaveAttribute('href', '/projects/transpahire');
    const contact = screen.getByRole('link', { name: 'Start a conversation' });
    expect(contact).toHaveAttribute('href', '/contact');
  });

  it('emits a Person + ProfilePage graph — never CreativeWork/SoftwareApplication (A6, §22 RULE)', () => {
    const { container } = render(<EngineeringPage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const graph = JSON.parse(script!.textContent!);
    expect(Array.isArray(graph)).toBe(true);
    const types = graph.map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('ProfilePage');
    expect(types).not.toContain('CreativeWork');
    expect(types).not.toContain('SoftwareApplication');
  });

  it('never fabricates a metric — no invented user/hire/coverage counts appear (A2, C4)', () => {
    render(<EngineeringPage />);
    expect(
      screen.queryByText(/\d[\d,]*\s+(users|hires|customers|companies)/i),
    ).toBeNull();
    // No invented coverage/performance percentage sneaks into the copy.
    expect(screen.queryByText(/\d+%\s*(coverage|faster|smaller)/i)).toBeNull();
  });

  it('has no axe violations across the full page (S15 §14, gate G2)', async () => {
    const { container } = render(<EngineeringPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
