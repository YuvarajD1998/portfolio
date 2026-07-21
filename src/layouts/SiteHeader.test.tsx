import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@/providers/theme-provider';
import { THEME_ATTRIBUTE } from '@/theme/config';

// usePathname drives the active-route indicator; mock it per test.
const pathname = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => pathname(),
}));

// ResizeObserver is used by Radix (Drawer); jsdom lacks it.
beforeEach(() => {
  globalThis.ResizeObserver =
    globalThis.ResizeObserver ??
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
});

async function renderHeader() {
  const { SiteHeader } = await import('@/layouts/SiteHeader');
  return render(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>,
  );
}

describe('SiteHeader', () => {
  afterEach(() => {
    pathname.mockReturnValue('/');
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
  });

  it('renders the primary navigation landmark with the four-model items', async () => {
    await renderHeader();
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    // Work, About, Contact appear in the desktop bar.
    expect(
      within(primary).getByRole('link', { name: 'Work' }),
    ).toBeInTheDocument();
    expect(
      within(primary).getByRole('link', { name: 'About' }),
    ).toBeInTheDocument();
    expect(
      within(primary).getByRole('link', { name: 'Contact' }),
    ).toBeInTheDocument();
  });

  it('marks the active route with aria-current (A2)', async () => {
    pathname.mockReturnValue('/projects/transpahire');
    await renderHeader();
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    // "Work" → /projects stays current inside a nested case study.
    const work = within(primary).getByRole('link', { name: 'Work' });
    expect(work).toHaveAttribute('aria-current', 'page');
    const about = within(primary).getByRole('link', { name: 'About' });
    expect(about).not.toHaveAttribute('aria-current');
  });

  it('exposes the theme toggle and switches theme globally (A5)', async () => {
    const user = userEvent.setup();
    await renderHeader();
    const toggle = screen.getByRole('button', {
      name: /switch to (dark|light) theme/i,
    });
    await user.click(toggle);
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark');
  });

  it('provides a mobile navigation trigger (A4)', async () => {
    await renderHeader();
    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument();
  });
});
