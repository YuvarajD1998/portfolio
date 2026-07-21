import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  certifications,
  crossLinks,
  download,
  education,
  employment,
  hero,
  highlights,
  skillsSnapshot,
  summary,
} from '@/content/resume';
import { DownloadButton } from '@/features/resume';

import ResumePage from './page';

/**
 * Resume page tests (Sprint 11 §16 — tests cover rendering of all sections from
 * frozen content; the download success path (correct file/MIME) and the failure
 * path (graceful, never a silent fail); cross-link navigation; accessibility
 * (one <h1>, labelled sections); and content fidelity — every fact matches the
 * frozen record (no drift). Assertions read against the frozen content exports
 * rather than hardcoded strings, so a copy change surfaces as a content-file
 * edit, not a test rewrite (S11 §01 RULE, §08).
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

/** The narrative-order section anchors (S11 §02). */
const SECTION_IDS = [
  'summary',
  'highlights',
  'employment',
  'education',
  'certifications',
  'skills',
  'download',
  'cross-links',
];

describe('ResumePage', () => {
  it('renders exactly one <h1> — the hero page title (heading hierarchy, §15)', () => {
    render(<ResumePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(hero.title);
  });

  it('implements every approved section as an anchored, labelled <section> (§02)', () => {
    const { container } = render(<ResumePage />);
    for (const id of SECTION_IDS) {
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section #${id}`).not.toBeNull();
      const labelledBy = section!.getAttribute('aria-labelledby')!;
      const heading = document.getElementById(labelledBy);
      expect(heading).not.toBeNull();
      expect(heading!.tagName).toBe('H2');
    }
  });

  it('keeps the sections in the load-bearing narrative order (§02)', () => {
    const { container } = render(<ResumePage />);
    const rendered = Array.from(container.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => SECTION_IDS.includes(id));
    expect(rendered).toEqual(SECTION_IDS);
  });

  it('renders the professional summary verbatim from the frozen record (§04)', () => {
    render(<ResumePage />);
    expect(screen.getByText(summary.body)).toBeInTheDocument();
  });

  it('renders each résumé highlight and the notable accomplishment (§05)', () => {
    const { container } = render(<ResumePage />);
    const section = within(
      container.querySelector<HTMLElement>('section#highlights')!,
    );
    for (const item of highlights.items) {
      expect(section.getByText(item.value)).toBeInTheDocument();
    }
    expect(
      section.getByText(highlights.accomplishment.body),
    ).toBeInTheDocument();
  });

  it('renders each role with its frozen company, position, duration and summary (§06)', () => {
    const { container } = render(<ResumePage />);
    const section = within(
      container.querySelector<HTMLElement>('section#employment')!,
    );
    for (const role of employment.roles) {
      expect(
        section.getByText(role.company, { exact: false }),
      ).toBeInTheDocument();
      expect(
        section.getByText(role.duration, { exact: false }),
      ).toBeInTheDocument();
      expect(section.getByText(role.summary)).toBeInTheDocument();
    }
  });

  it('renders the education node exactly as the frozen record carries it (§07)', () => {
    const { container } = render(<ResumePage />);
    const section = within(
      container.querySelector<HTMLElement>('section#education')!,
    );
    const { degree } = education;
    expect(section.getByText(degree.title)).toBeInTheDocument();
    expect(section.getByText(degree.institution)).toBeInTheDocument();
    expect(section.getByText(degree.duration)).toBeInTheDocument();
    expect(section.getByText(degree.detail)).toBeInTheDocument();
  });

  it('renders certification names only, with issuer/date shown pending — never invented (§09)', () => {
    const { container } = render(<ResumePage />);
    const section = within(
      container.querySelector<HTMLElement>('section#certifications')!,
    );
    for (const cert of certifications.items) {
      expect(section.getByText(cert.name)).toBeInTheDocument();
      const pendings = section.getAllByText(cert.pending);
      expect(pendings.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders the skills snapshot as names only — no numeric proficiency (§10)', () => {
    const { container } = render(<ResumePage />);
    const section = within(
      container.querySelector<HTMLElement>('section#skills')!,
    );
    for (const tech of skillsSnapshot.technologies) {
      expect(section.getByText(tech)).toBeInTheDocument();
    }
    // No proficiency bars or scores anywhere on the page (§10 RULE).
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.queryByText(/\d+%/)).toBeNull();
  });

  it('links the full skills breakdown out to /skills rather than copying it (§10)', () => {
    render(<ResumePage />);
    const link = screen.getByRole('link', {
      name: skillsSnapshot.fullBreakdown.label,
    });
    expect(link).toHaveAttribute('href', skillsSnapshot.fullBreakdown.href);
  });

  it('routes every cross-link to a real / approved-IA destination (§12 RULE)', () => {
    const { container } = render(<ResumePage />);
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

  it('emits a Person graph that reuses frozen identity — no new claim (§15 RULE)', () => {
    const { container } = render(<ResumePage />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    const graph = JSON.parse(script!.textContent!);
    // The page emits a single Person node (never CreativeWork/SoftwareApplication).
    const nodes = Array.isArray(graph) ? graph : [graph];
    const types = nodes.map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Person');
    expect(types).not.toContain('CreativeWork');
    expect(types).not.toContain('SoftwareApplication');
  });
});

/**
 * The download control is the single most important function on the page — it
 * must never silently fail (S11 §11). These tests exercise the DownloadButton
 * directly so both the available and the Content-Required (C3) states are
 * covered independent of the page's current C3 gate.
 */
describe('DownloadButton (§11)', () => {
  // `download.available` is the C3 gate. `as const` is compile-time only, so the
  // runtime value is mutable; a mutable view lets a test drive the AVAILABLE path
  // without shipping a real asset. Restored after each test.
  const mutable = download as { available: boolean };
  const original = download.available;
  afterEach(() => {
    mutable.available = original;
    vi.unstubAllGlobals();
  });

  it('shows the honest "not yet available" state while the asset is Content Required (C3)', () => {
    // The frozen content ships with `available: false` until the asset lands.
    expect(download.available).toBe(false);
    render(<DownloadButton />);
    // The control is present but disabled, with the pending explanation — never a
    // dead link to a missing file.
    expect(screen.getByText(download.cta)).toBeInTheDocument();
    // The pending explanation is a warning Alert (assertive → role="alert").
    expect(screen.getByRole('alert')).toHaveTextContent(download.pending);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders a real, accessible anchor with download + type when the asset is available', () => {
    mutable.available = true;
    render(<DownloadButton />);
    const link = screen.getByRole('link', { name: download.cta });
    expect(link).toHaveAttribute('href', download.href);
    expect(link).toHaveAttribute('download', download.fileName);
    expect(link).toHaveAttribute('type', 'application/pdf');
  });

  it('verifies the file then triggers the download on the success path', async () => {
    mutable.available = true;
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200 } as Response);
    vi.stubGlobal('fetch', fetchMock);
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    render(<DownloadButton />);
    await userEvent.click(screen.getByRole('link', { name: download.cta }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(download.href, { method: 'HEAD' });
    });
    // A transient anchor is clicked to honour the `download` attribute.
    expect(clickSpy).toHaveBeenCalled();
    // No error surfaced on the happy path.
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('surfaces a graceful error — never a silent fail — when the file is unavailable', async () => {
    mutable.available = true;
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 404 } as Response);
    vi.stubGlobal('fetch', fetchMock);

    render(<DownloadButton />);
    await userEvent.click(screen.getByRole('link', { name: download.cta }));

    // The failure path renders an assertive Alert, not nothing.
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/could not be downloaded/i);
  });
});
