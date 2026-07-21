import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  aiPipeline,
  features,
  hero,
  matching,
  personas,
  roadmap,
} from '@/content/transpahire';

import TranspahirePage from './page';

/**
 * Transpahire flagship case-study tests (Sprint 07 §22 — tests cover rendering,
 * section navigation, anchor links, expandable sections, deep linking,
 * accessibility, structured data). Assertions read against the frozen content
 * exports rather than hardcoded strings, so a copy change in the Product Book
 * surfaces as a content-file edit, not a test rewrite (A2).
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

/** The sixteen movements, in narrative order — the anchors the rail steers by. */
const SECTION_IDS = [
  'problem',
  'users',
  'solution',
  'design',
  'journey',
  'system',
  'frontend',
  'backend',
  'data',
  'ai',
  'matching',
  'api',
  'scale',
  'tradeoffs',
  'results',
  'roadmap',
];

describe('TranspahirePage', () => {
  it('renders exactly one <h1> — the hero product title (heading hierarchy, A5)', () => {
    render(<TranspahirePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(hero.title);
  });

  it('implements every approved movement as an anchored, labelled <section> (A1, A4)', () => {
    const { container } = render(<TranspahirePage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      // Each section is labelled by a real H2 (single H1 already asserted).
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the movements in the load-bearing narrative order (S07 §02)', () => {
    const { container } = render(<TranspahirePage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('exposes the section rail as an "On this page" nav with an anchor per movement (A4)', () => {
    render(<TranspahirePage />);
    const rail = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(rail).getAllByRole('link');
    expect(links).toHaveLength(SECTION_IDS.length);
    // Every rail link targets a real section anchor (deep-linkable, S07 §21).
    for (const id of SECTION_IDS) {
      const anchor = links.find((l) => l.getAttribute('href') === `#${id}`);
      expect(anchor, `rail missing anchor #${id}`).toBeTruthy();
    }
  });

  it('preserves the Product-Book status glyphs — never rounds Partial/Flag-gated up (A2)', () => {
    render(<TranspahirePage />);
    // §06 marks two facts honestly: qualityScore Partial, Revenue tab Planned.
    expect(screen.getAllByText('Partial').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Planned').length).toBeGreaterThanOrEqual(1);
    // §15 matching splits shipped (Implemented) from held (Flag-gated).
    expect(screen.getAllByText('Flag-gated').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Implemented').length).toBeGreaterThanOrEqual(1);
  });

  it('renders every feature card with its frozen summary at true status (A2)', () => {
    render(<TranspahirePage />);
    for (const feature of features) {
      expect(screen.getByText(feature.body)).toBeInTheDocument();
    }
  });

  it('renders all eight personas from the real role model (A2)', () => {
    render(<TranspahirePage />);
    // Each persona role is a card heading (the body prose may mention a role
    // name in passing, so target the heading, not any text match).
    for (const persona of personas) {
      expect(
        screen.getByRole('heading', { level: 3, name: persona.role }),
      ).toBeInTheDocument();
    }
  });

  it('keeps progressive-disclosure depth in the DOM while collapsed (A4, crawlable)', () => {
    render(<TranspahirePage />);
    // The AI honest-note and matching weights live inside <details> panels;
    // their content is present even collapsed (S07 §11 RULE).
    expect(screen.getByText(aiPipeline.honest)).toBeInTheDocument();
    // The weight formula table exposes every verbatim weight.
    for (const row of matching.weights) {
      expect(screen.getByText(row.weight)).toBeInTheDocument();
    }
  });

  it('exposes depth as native, deep-linkable <details> panels (A4)', () => {
    const { container } = render(<TranspahirePage />);
    const panels = container.querySelectorAll('details');
    expect(panels.length).toBeGreaterThanOrEqual(3);
    // Key panels carry stable ids a hash can target and auto-open.
    expect(container.querySelector('details#matching-weights')).not.toBeNull();
    expect(container.querySelector('details#ai-honest')).not.toBeNull();
  });

  it('renders the system diagram as an accessible inline SVG (A3)', () => {
    const { container } = render(<TranspahirePage />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).not.toBeNull();
    // Text alternative: labelled by a <title> + <desc> (S07 §09 RULE, §22).
    const labelledBy = svg!.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(svg!.querySelector('title')).not.toBeNull();
    expect(svg!.querySelector('desc')).not.toBeNull();
    // A semantic caption accompanies the figure.
    expect(svg!.closest('figure')!.querySelector('figcaption')).not.toBeNull();
  });

  it('routes the closing CTAs to real, existing destinations (A5)', () => {
    render(<TranspahirePage />);
    const primary = screen.getAllByRole('link', {
      name: roadmap.cta.primary.label,
    });
    expect(primary[0]).toHaveAttribute('href', roadmap.cta.primary.href);
    const contact = screen.getByRole('link', {
      name: roadmap.cta.tertiary.label,
    });
    expect(contact).toHaveAttribute('href', '/contact');
  });

  it('emits a Person + CreativeWork graph — never SoftwareApplication (A6, S07 §22 RULE)', () => {
    const { container } = render(<TranspahirePage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const graph = JSON.parse(script!.textContent!);
    expect(Array.isArray(graph)).toBe(true);
    const types = graph.map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('CreativeWork');
    expect(types).not.toContain('SoftwareApplication');
    const work = graph.find(
      (n: { '@type': string }) => n['@type'] === 'CreativeWork',
    );
    expect(work.name).toBe(hero.title);
    expect(work.description).toBe(hero.summary);
  });

  it('never fabricates a metric — no invented user/hire counts appear (A2, C6)', () => {
    render(<TranspahirePage />);
    // Guard against a hallucinated adoption number sneaking into the copy.
    expect(
      screen.queryByText(/\d[\d,]*\s+(users|hires|customers|companies)/i),
    ).toBeNull();
  });
});
