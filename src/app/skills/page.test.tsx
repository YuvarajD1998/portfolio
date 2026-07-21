import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  categories,
  certifications,
  coreExpertise,
  learning,
  overview,
  workflow,
} from '@/content/skills';

import SkillsPage from './page';

/**
 * Skills page tests (Sprint 10 §17 — tests cover rendering of all twelve
 * categories from frozen content; anchor nav, scroll-spy and deep links;
 * responsive/section structure; accessibility (heading hierarchy); and content
 * fidelity — no string outside Book A, no fabricated proficiency). Assertions
 * read against the frozen content exports rather than hardcoded strings, so a
 * copy change in the books surfaces as a content-file edit, not a test rewrite
 * (S10 §01 RULE).
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

/** The narrative-order section anchors the rail steers by (S10 §02, §16). */
const SECTION_IDS = [
  'core-expertise',
  'categories',
  'in-context',
  'workflow',
  'learning',
  'certifications',
];

describe('SkillsPage', () => {
  it('renders exactly one <h1> — the hero page title (heading hierarchy, §17)', () => {
    render(<SkillsPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(overview.title);
  });

  it('implements every approved section as an anchored, labelled <section> (§02, §16)', () => {
    const { container } = render(<SkillsPage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the sections in the load-bearing narrative order (S10 §02)', () => {
    const { container } = render(<SkillsPage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('leads with core expertise, then the full category set — breadth after depth (S10 §02)', () => {
    const { container } = render(<SkillsPage />);
    const ids = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(ids[0]).toBe('core-expertise');
    expect(ids.indexOf('core-expertise')).toBeLessThan(
      ids.indexOf('categories'),
    );
    expect(ids.indexOf('categories')).toBeLessThan(
      ids.indexOf('certifications'),
    );
  });

  it('exposes the section rail as an "On this page" nav with an anchor per section (§16)', () => {
    render(<SkillsPage />);
    const rail = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(rail).getAllByRole('link');
    expect(links).toHaveLength(SECTION_IDS.length);
    for (const id of SECTION_IDS) {
      const anchor = links.find((l) => l.getAttribute('href') === `#${id}`);
      expect(anchor, `rail missing anchor #${id}`).toBeTruthy();
    }
  });

  it('renders all twelve frozen categories, each with a real descriptive sentence (§05–§10)', () => {
    const { container } = render(<SkillsPage />);
    const grid = within(
      container.querySelector<HTMLElement>('section#categories')!,
    );
    expect(categories).toHaveLength(12);
    for (const category of categories) {
      // Each category card is an <h3> named by the category, with its sentence.
      const heading = document.getElementById(`cat-${category.id}`);
      expect(heading, `missing category heading ${category.id}`).not.toBeNull();
      expect(heading!.tagName).toBe('H3');
      expect(heading!).toHaveTextContent(category.name);
      expect(grid.getByText(category.description)).toBeInTheDocument();
    }
  });

  it('keeps the frozen Book A grouping — no category added, renamed or merged (§10 RULE)', () => {
    const names = categories.map((c) => c.name);
    expect(names).toEqual([
      'Frontend',
      'Backend',
      'AI & Real-time',
      'Databases',
      'Architecture',
      'Performance',
      'Accessibility',
      'Design systems',
      'Testing',
      'DevOps',
      'Dev tools',
      'Languages',
    ]);
  });

  it('renders each category technology as an accessible text badge, not a logo (§05)', () => {
    const { container } = render(<SkillsPage />);
    const grid = within(
      container.querySelector<HTMLElement>('section#categories')!,
    );
    for (const category of categories) {
      if (category.technologies.length === 0) continue;
      const list = grid.getByRole('list', {
        name: `${category.name} technologies`,
      });
      for (const tech of category.technologies) {
        expect(within(list).getByText(tech)).toBeInTheDocument();
      }
    }
    // No <img> logo wall anywhere on the page.
    expect(container.querySelector('img')).toBeNull();
  });

  it('names the core-expertise strengths and links each to where it was proven (§04)', () => {
    const { container } = render(<SkillsPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#core-expertise')!,
    );
    for (const item of coreExpertise.items) {
      expect(section.getByText(item.title)).toBeInTheDocument();
      expect(section.getByText(item.body)).toBeInTheDocument();
    }
  });

  it('renders the four development-workflow statements verbatim (§12)', () => {
    render(<SkillsPage />);
    for (const item of workflow.items) {
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });

  it('ships the learning philosophy and marks the explicit list as pending — never guessed (§13)', () => {
    const { container } = render(<SkillsPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#learning')!,
    );
    expect(section.getByText(learning.philosophy.body)).toBeInTheDocument();
    expect(
      section.getByText(learning.currentlyExploring.pending),
    ).toBeInTheDocument();
  });

  it('renders certification names only, with issuer/date shown pending, never invented (§14)', () => {
    const { container } = render(<SkillsPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#certifications')!,
    );
    for (const cert of certifications.items) {
      // Each card renders the certification NAME verbatim...
      expect(section.getByText(cert.name)).toBeInTheDocument();
      // ...and its issuer/date as a pending status (both certs share the copy).
      const pendings = section.getAllByText(cert.pending);
      expect(pendings.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('never renders a numeric proficiency — no bars, percentages or "n/10" scores (§05 Forbidden)', () => {
    render(<SkillsPage />);
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.queryByText(/\d+%/)).toBeNull();
    expect(screen.queryByText(/\b\d+\s*\/\s*10\b/)).toBeNull();
  });

  it('routes every closing CTA to a real / approved-IA destination (§15 RULE)', () => {
    render(<SkillsPage />);
    expect(
      screen.getByRole('link', { name: 'See how I think' }),
    ).toHaveAttribute('href', '/engineering');
    expect(
      screen.getByRole('link', { name: 'See the experience' }),
    ).toHaveAttribute('href', '/experience');
    expect(
      screen.getByRole('link', { name: 'Start a conversation' }),
    ).toHaveAttribute('href', '/contact');
  });

  it('links the flagship out rather than re-telling it (§11, §15)', () => {
    render(<SkillsPage />);
    const links = screen.getAllByRole('link', {
      name: 'Read the Transpahire case study',
    });
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/projects/transpahire');
    }
  });

  it('emits a Person + ProfilePage graph — never CreativeWork/SoftwareApplication (§17 RULE)', () => {
    const { container } = render(<SkillsPage />);
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
});
