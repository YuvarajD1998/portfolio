import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { footerColumns } from '@/config/navigation';
import { axe } from '@/tests/axe';

import { SiteFooter } from './SiteFooter';

/**
 * SiteFooter a11y tests (Sprint 15 §02 — landmark hygiene).
 *
 * The footer indexes every page. Sprint 15 collapsed the per-column `<nav>`
 * landmarks (which flooded the AT landmark menu) into a single labelled
 * `<nav aria-label="Footer">`; each column is now a titled `<ul>` labelled by
 * its heading via `aria-labelledby`. These tests lock that in so a regression
 * (reintroducing a landmark per column) fails the suite.
 */
describe('SiteFooter — landmark hygiene (§02)', () => {
  it('exposes exactly one navigation landmark, labelled "Footer"', () => {
    render(<SiteFooter />);
    const navs = screen.getAllByRole('navigation');
    expect(navs).toHaveLength(1);
    expect(navs[0]).toHaveAccessibleName('Footer');
  });

  it('keeps each column a list labelled by its visible title', () => {
    render(<SiteFooter />);
    // Every configured column title still names a list (aria-labelledby), so
    // AT announces the group without a redundant landmark.
    for (const column of footerColumns) {
      const list = screen.getByRole('list', { name: column.title });
      expect(list).toBeInTheDocument();
    }
    // The socials column too.
    expect(screen.getByRole('list', { name: 'Elsewhere' })).toBeInTheDocument();
  });

  it('has no axe violations (gate G2)', async () => {
    const { container } = render(<SiteFooter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
