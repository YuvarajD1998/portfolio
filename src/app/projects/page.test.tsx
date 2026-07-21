import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  categories,
  controls,
  emptyState,
  featured,
  projects,
} from '@/content/projects';

import ProjectsPage from './page';

/**
 * Projects overview tests (Sprint 06 §15 — Tests cover rendering, filtering,
 * search, empty state, navigation/routing, accessibility). Assertions read
 * against the frozen content exports rather than hardcoded strings, so a copy
 * change in the Bible surfaces as a content-file edit, not a test rewrite.
 */

// Motion's whileInView (Reveal/Stagger) needs IntersectionObserver; jsdom omits
// it. ResizeObserver is needed by Radix Select's trigger.
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
  globalThis.ResizeObserver =
    globalThis.ResizeObserver ??
    (class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver);
});

describe('ProjectsPage', () => {
  it('renders exactly one <h1> — the page hero (heading hierarchy)', () => {
    render(<ProjectsPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it('places the featured Transpahire band above the grid (A2)', () => {
    const { container } = render(<ProjectsPage />);
    const featuredSection = container.querySelector(
      'section[aria-labelledby="featured-heading"]',
    );
    const gridSection = container.querySelector(
      'section[aria-labelledby="all-work-heading"]',
    );
    expect(featuredSection).not.toBeNull();
    expect(gridSection).not.toBeNull();
    // The featured band precedes the grid in document order.
    expect(
      featuredSection!.compareDocumentPosition(gridSection!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('renders the flagship name in the featured band, never as a grid card', () => {
    render(<ProjectsPage />);
    // Transpahire appears (featured band) but is not one of the grid cards.
    const cardHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(cardHeadings).not.toContain(featured.name);
  });

  it('renders exactly the four supporting projects, with frozen summaries', () => {
    render(<ProjectsPage />);
    expect(projects).toHaveLength(4);
    const cardHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(cardHeadings).toHaveLength(projects.length);
    for (const project of projects) {
      expect(
        screen.getByRole('heading', { level: 3, name: project.name }),
      ).toBeInTheDocument();
      // The summary renders verbatim (P10A §10).
      expect(screen.getByText(project.summary)).toBeInTheDocument();
    }
  });

  it('never ships the Phase 08 wireframe filler cards', () => {
    render(<ProjectsPage />);
    expect(screen.queryByText(/Ledger UI/i)).toBeNull();
    expect(screen.queryByText(/Atlas CLI/i)).toBeNull();
  });

  it('routes each card to a real, existing destination (A5)', () => {
    render(<ProjectsPage />);
    for (const project of projects) {
      const link = screen.getByRole('link', {
        name: new RegExp(`View ${project.name}`),
      });
      // No dead /projects/:slug links until the interior exists (S06 §11).
      expect(link).toHaveAttribute('href', project.href);
    }
  });

  it('routes the featured band CTA to the flagship case study', () => {
    render(<ProjectsPage />);
    const cta = screen.getByRole('link', { name: featured.cta.label });
    expect(cta).toHaveAttribute('href', '/projects/transpahire');
  });

  it('exposes the category filter as a labelled radio-group with "All" default', () => {
    render(<ProjectsPage />);
    const group = screen.getByRole('radiogroup', {
      name: controls.filterLegend,
    });
    const radios = within(group).getAllByRole('radio');
    expect(radios).toHaveLength(categories.length);
    const all = within(group).getByRole('radio', { name: 'All' });
    expect(all).toHaveAttribute('aria-checked', 'true');
  });

  it('filters the grid to a single category when a chip is selected (A4)', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const [target] = projects;
    if (!target) throw new Error('expected at least one project');
    const chip = screen.getByRole('radio', { name: target.category });
    await user.click(chip);
    expect(chip).toHaveAttribute('aria-checked', 'true');
    // Only projects in that category remain.
    const remaining = projects.filter((p) => p.category === target.category);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(remaining.length);
    expect(
      screen.getByRole('heading', { level: 3, name: target.name }),
    ).toBeInTheDocument();
  });

  it('narrows the grid by search text, combining with the filter', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const [target] = projects;
    if (!target) throw new Error('expected at least one project');
    const search = screen.getByRole('searchbox', {
      name: controls.searchLabel,
    });
    await user.type(search, target.name);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(target.name);
  });

  it('renders the results as a plain semantic list, not a scroll-gated reveal', () => {
    // Regression: the grid must not sit inside a whileInView motion wrapper.
    // When cards re-mount on a filter change while already on-screen, a
    // scroll-triggered reveal leaves them stuck at opacity 0 — the grid
    // "becomes empty" on category switch (S06 §12: never gate reading on motion).
    render(<ProjectsPage />);
    const firstCard = screen.getByRole('heading', {
      level: 3,
      name: projects[0]!.name,
    });
    const listItem = firstCard.closest('li');
    expect(listItem).not.toBeNull();
    // Its list ancestor holds exactly the visible cards.
    const list = listItem!.closest('ul');
    expect(list).not.toBeNull();
    expect(within(list!).getAllByRole('heading', { level: 3 })).toHaveLength(
      projects.length,
    );
  });

  it('keeps cards queryable across repeated category switches (A4 regression)', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    // Cycle through every chip; each selection must leave its card present.
    for (const category of categories) {
      await user.click(screen.getByRole('radio', { name: category }));
      const expected =
        category === 'All'
          ? projects.length
          : projects.filter((p) => p.category === category).length;
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
        expected,
      );
    }
  });

  it('shows the frozen empty state and clears back to all results (A4)', async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const search = screen.getByRole('searchbox', {
      name: controls.searchLabel,
    });
    await user.type(search, 'zzzznomatch');
    // Grid is replaced by the verbatim empty-state message.
    expect(screen.getByText(emptyState.message)).toBeInTheDocument();
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0);
    // The one action that fixes it: clear filters.
    await user.click(screen.getByRole('button', { name: emptyState.action }));
    expect(screen.queryByText(emptyState.message)).toBeNull();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      projects.length,
    );
  });

  it('announces the result count through a polite live region', () => {
    render(<ProjectsPage />);
    const live = document.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live).toHaveTextContent(/projects shown/i);
  });

  it('resolves every section landmark to a heading (accessibility)', () => {
    const { container } = render(<ProjectsPage />);
    const sections = container.querySelectorAll('section[aria-labelledby]');
    expect(sections.length).toBeGreaterThanOrEqual(4);
    for (const section of sections) {
      const id = section.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(id);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toMatch(/^H[12]$/);
    }
  });

  it('emits the Person + CreativeWork structured-data graph (SEO, A7)', () => {
    const { container } = render(<ProjectsPage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const graph = JSON.parse(script!.textContent!);
    expect(Array.isArray(graph)).toBe(true);
    const types = graph.map((node: { '@type': string }) => node['@type']);
    expect(types).toContain('Person');
    expect(types.filter((t: string) => t === 'CreativeWork').length).toBe(
      projects.length + 1, // four supporting + the flagship
    );
    // No CollectionPage — it appears in no source (S06 §14 RULE).
    expect(types).not.toContain('CollectionPage');
  });
});
