import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@/providers/theme-provider';

const pathname = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => pathname(),
}));

// Radix Dialog (the Drawer under MobileNav) needs these jsdom stubs.
beforeAll(() => {
  globalThis.ResizeObserver =
    globalThis.ResizeObserver ??
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe('SiteHeader mobile navigation (A4)', () => {
  it('opens a drawer exposing the full nav including Resume', async () => {
    const user = userEvent.setup();
    const { SiteHeader } = await import('@/layouts/SiteHeader');
    render(
      <ThemeProvider>
        <SiteHeader />
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    // Radix Dialog renders a modal dialog with the title "Menu".
    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByRole('link', { name: 'Work' }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole('link', { name: 'About' }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole('link', { name: 'Contact' }),
    ).toBeInTheDocument();
    // Resume is part of the mobile list (it is a CTA on desktop only).
    expect(
      within(dialog).getByRole('link', { name: 'Resume' }),
    ).toBeInTheDocument();
  });
});
