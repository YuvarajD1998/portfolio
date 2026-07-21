import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { siteConfig } from '@/config/site';
import {
  callToAction,
  crossLinks,
  faq,
  hero,
  methods,
  socialLinks,
} from '@/content/contact';

import ContactPage from './page';

/**
 * Contact page tests (Sprint 12 §16). Cover: rendering every approved section
 * from frozen content in the load-bearing order; one <h1>; the contact facts
 * matching the frozen record verbatim (no drift); external links opening
 * securely; the FAQ self-omitting while Content Required (C6); cross-links
 * resolving to canonical routes; and the Person + ContactPage graph reusing
 * frozen identity (no new claim). Assertions read against the frozen content
 * exports, so a copy change surfaces as a content-file edit, not a test rewrite
 * (S12 §01 RULE).
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

/** The narrative-order section anchors (S12 §02). FAQ is content-gated (C6). */
const SECTION_IDS = [
  'contact-methods',
  'contact-form',
  'availability',
  'social-links',
  'resume-access',
  'cross-links',
];

describe('ContactPage', () => {
  it('renders exactly one <h1> — the hero page title (heading hierarchy, §15)', () => {
    render(<ContactPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(hero.title);
  });

  it('implements every approved section as an anchored, labelled <section> (§02)', () => {
    const { container } = render(<ContactPage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the sections in the load-bearing conversion order (§02)', () => {
    const { container } = render(<ContactPage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('renders the primary CTA in the hero AND at the close (§02, §13)', () => {
    render(<ContactPage />);
    const ctas = screen.getAllByRole('link', { name: hero.primaryCta });
    // The "Start a conversation" CTA appears twice by design (hero + final CTA).
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', hero.primaryCtaHref);
    }
  });

  it('renders every frozen contact method verbatim, with correct link behaviour (§04)', () => {
    const { container } = render(<ContactPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#contact-methods')!,
    );
    for (const method of methods.items) {
      const link = section.getByRole('link', { name: method.accessibleName });
      expect(link).toHaveAttribute('href', method.href);
      if (method.kind === 'external') {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      } else {
        // mailto: / tel: links stay in the same tab.
        expect(link).not.toHaveAttribute('target');
      }
      expect(section.getByText(method.value)).toBeInTheDocument();
    }
  });

  it('surfaces the exact frozen contact facts — no edited detail (§04 RULE)', () => {
    render(<ContactPage />);
    // The record: email · github · linkedin · phone (P10A §07). GitHub &
    // LinkedIn legitimately appear in both the methods (§04) and social (§08)
    // sections; the facts must be present and verbatim, so assert ≥ 1.
    expect(
      screen.getAllByText(siteConfig.contact.emailAddress).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(siteConfig.contact.githubHandle).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(siteConfig.contact.linkedinHandle).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(siteConfig.contact.phone)).toBeInTheDocument();
  });

  it('limits social links to the approved GitHub + LinkedIn set (§08 RULE)', () => {
    const { container } = render(<ContactPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#social-links')!,
    );
    const links = section.getAllByRole('link');
    expect(links).toHaveLength(socialLinks.items.length);
    expect(socialLinks.items.map((i) => i.id).sort()).toEqual([
      'github',
      'linkedin',
    ]);
  });

  it('omits the FAQ section while its copy is Content Required (§10 RULE, C6)', () => {
    const { container } = render(<ContactPage />);
    // C6 — no approved Q&A on the record, so the section must not render.
    expect(faq.items).toHaveLength(0);
    expect(container.querySelector('section#faq')).toBeNull();
  });

  it('routes every cross-link to a real / approved-IA destination (§12 RULE)', () => {
    const { container } = render(<ContactPage />);
    const section = within(
      container.querySelector<HTMLElement>('section#cross-links')!,
    );
    for (const link of crossLinks.links) {
      const anchor = section.getByRole('link', {
        name: new RegExp(link.label),
      });
      expect(anchor).toHaveAttribute('href', link.href);
    }
  });

  it('restates the primary email channel at the close, unedited (§13 RULE)', () => {
    const { container } = render(<ContactPage />);
    const cta = within(
      container
        .querySelector<HTMLElement>('#contact-cta-heading')!
        .closest('section')!,
    );
    const email = cta.getByRole('link', { name: callToAction.email.label });
    expect(email).toHaveAttribute('href', callToAction.email.href);
  });

  it('emits a Person + ContactPage graph that reuses frozen facts — no new claim (§15 RULE)', () => {
    const { container } = render(<ContactPage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const graph = JSON.parse(script!.textContent!);
    const nodes = Array.isArray(graph) ? graph : [graph];
    const types = nodes.map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('ContactPage');
    // The graph carries the SAME frozen email the page renders — not a new one.
    const person = nodes.find(
      (n: { '@type': string }) => n['@type'] === 'Person',
    );
    const serialized = JSON.stringify(person);
    expect(serialized).toContain(siteConfig.contact.emailAddress);
  });
});
