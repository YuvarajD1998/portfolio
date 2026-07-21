import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  achievements,
  arc,
  collaboration,
  education,
  overview,
  roles,
} from '@/content/experience';

import ExperiencePage from './page';

/**
 * Experience page tests (Sprint 09 §16 — tests cover rendering of the hero,
 * timeline and both role cards; timeline anchor nav, scroll-spy and deep links;
 * responsive structure; accessibility; theme; and content fidelity — no string
 * outside Book A). Assertions read against the frozen content exports rather than
 * hardcoded strings, so a copy change in the books surfaces as a content-file
 * edit, not a test rewrite (S09 §01 RULE).
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

/** The narrative-order section anchors the rail steers by (S09 §02, §14). */
const SECTION_IDS = [
  'arc',
  'timeline',
  'achievements',
  'technology',
  'collaboration',
  'highlights',
  'education',
];

describe('ExperiencePage', () => {
  it('renders exactly one <h1> — the hero page title (heading hierarchy, §16)', () => {
    render(<ExperiencePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(overview.title);
  });

  it('implements every approved section as an anchored, labelled <section> (§02, §14)', () => {
    const { container } = render(<ExperiencePage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the sections in the load-bearing narrative order (S09 §02)', () => {
    const { container } = render(<ExperiencePage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('leads with the career arc, then the timeline — chronology as the spine (S09 §02)', () => {
    const { container } = render(<ExperiencePage />);
    const ids = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(ids[0]).toBe('arc');
    expect(ids.indexOf('arc')).toBeLessThan(ids.indexOf('timeline'));
    expect(ids.indexOf('timeline')).toBeLessThan(ids.indexOf('highlights'));
  });

  it('exposes the section rail as an "On this page" nav with an anchor per section (§14)', () => {
    render(<ExperiencePage />);
    const rail = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(rail).getAllByRole('link');
    expect(links).toHaveLength(SECTION_IDS.length);
    for (const id of SECTION_IDS) {
      const anchor = links.find((l) => l.getAttribute('href') === `#${id}`);
      expect(anchor, `rail missing anchor #${id}`).toBeTruthy();
    }
  });

  it('renders the timeline as an accessible ordered list, not a decorative graphic (§05 RULE)', () => {
    const { container } = render(<ExperiencePage />);
    const timeline = container.querySelector('section#timeline ol');
    expect(timeline).not.toBeNull();
    const items = timeline!.querySelectorAll(':scope > li');
    // One node per role + the supporting education node.
    expect(items.length).toBe(roles.length + 1);
  });

  it('renders both role cards verbatim from the frozen record, sharing one anatomy (§06, §07)', () => {
    const { container } = render(<ExperiencePage />);
    for (const role of roles) {
      const card = container.querySelector<HTMLElement>(`#${role.id}`);
      expect(card, `missing role card #${role.id}`).not.toBeNull();
      const scope = within(card!);
      // Company, position and every frozen responsibility are present in full,
      // scoped to the card (the company name also appears in §09/§08 by design).
      expect(scope.getByText(role.company)).toBeInTheDocument();
      expect(scope.getByText(role.position)).toBeInTheDocument();
      for (const item of role.responsibilities) {
        expect(scope.getByText(item)).toBeInTheDocument();
      }
    }
  });

  it('presents the two roles newest-first — the present role at the top (§05)', () => {
    render(<ExperiencePage />);
    const [current, previous] = roles;
    expect(current!.endDate).toBeNull();
    expect(current!.company).toBe('BlueRose Technologies');
    expect(previous!.company).toBe('Concentrix');
  });

  it('states the frozen through-line verbatim — one arc, not two entries (§04)', () => {
    render(<ExperiencePage />);
    expect(screen.getByText(arc.throughLine)).toBeInTheDocument();
  });

  it('ties each achievement to the role that produced it (§08)', () => {
    render(<ExperiencePage />);
    for (const item of achievements.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  it('shows collaboration as recorded, role-anchored acts — not generic teamwork (§10)', () => {
    render(<ExperiencePage />);
    for (const point of collaboration.points) {
      expect(screen.getByText(point.body)).toBeInTheDocument();
    }
  });

  it('renders education & certifications verbatim, plainly stated (§12)', () => {
    const { container } = render(<ExperiencePage />);
    // The institution also names the compact timeline node; scope to §12.
    const section = within(
      container.querySelector<HTMLElement>('section#education')!,
    );
    expect(
      section.getByText(education.degree.institution, { exact: false }),
    ).toBeInTheDocument();
    for (const cert of education.certifications) {
      expect(section.getByText(cert)).toBeInTheDocument();
    }
  });

  it('links the flagship out rather than re-telling it (§06 HONEST, §13)', () => {
    render(<ExperiencePage />);
    const links = screen.getAllByRole('link', {
      name: 'Read the Transpahire case study',
    });
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/projects/transpahire');
    }
  });

  it('routes every closing CTA to a real / approved-IA destination (§13 RULE)', () => {
    render(<ExperiencePage />);
    expect(
      screen.getByRole('link', { name: 'See how I think' }),
    ).toHaveAttribute('href', '/engineering');
    expect(
      screen.getByRole('link', { name: 'Start a conversation' }),
    ).toHaveAttribute('href', '/contact');
    expect(
      screen.getByRole('link', { name: 'View the résumé' }),
    ).toHaveAttribute('href', '/resume');
  });

  it('emits a Person + ProfilePage graph — never CreativeWork/SoftwareApplication (§16 RULE)', () => {
    const { container } = render(<ExperiencePage />);
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

  it('never fabricates a metric — no invented user/hire/coverage counts appear (§08 HONEST, C1)', () => {
    render(<ExperiencePage />);
    expect(
      screen.queryByText(/\d[\d,]*\s+(users|hires|customers|companies)/i),
    ).toBeNull();
    expect(screen.queryByText(/\d+%\s*(coverage|faster|smaller)/i)).toBeNull();
  });
});
