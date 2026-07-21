import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { type Crumb } from '@/components/navigation';
import { BreadcrumbTrail } from '@/layouts/BreadcrumbTrail';

// The engineering deep-dive is the level-two route that carries breadcrumbs.
const CRUMBS: Crumb[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Transpahire', href: '/projects/transpahire' },
  { label: 'Engineering' },
];

describe('BreadcrumbTrail', () => {
  it('renders a labelled breadcrumb nav', () => {
    render(<BreadcrumbTrail items={CRUMBS} />);
    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' }),
    ).toBeInTheDocument();
  });

  it('links ancestors and marks the final crumb current, not a link', () => {
    render(<BreadcrumbTrail items={CRUMBS} />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(
      within(nav).getByRole('link', { name: 'Transpahire' }),
    ).toHaveAttribute('href', '/projects/transpahire');
    // The current page is not a link and is aria-current="page".
    expect(
      within(nav).queryByRole('link', { name: 'Engineering' }),
    ).not.toBeInTheDocument();
    expect(within(nav).getByText('Engineering')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
