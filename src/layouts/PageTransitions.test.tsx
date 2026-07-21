import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PageTransitions } from './PageTransitions';

/**
 * PageTransitions tests (Sprint 13 §05).
 *
 * The route transition must NEVER gate content: children are always present in
 * the DOM whether or not the animation plays, and under reduced motion. A
 * transition that hid content until an animation finished would delay
 * navigation and break crawlers/AT — a §05 reject.
 */
vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}));

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('reduce') ? reduce : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('PageTransitions', () => {
  it('renders the route content (never gated behind the transition)', () => {
    mockReducedMotion(false);
    render(
      <PageTransitions>
        <p>route content</p>
      </PageTransitions>,
    );
    expect(screen.getByText('route content')).toBeInTheDocument();
  });

  it('renders the route content under reduced motion', () => {
    mockReducedMotion(true);
    render(
      <PageTransitions>
        <p>reduced route content</p>
      </PageTransitions>,
    );
    expect(screen.getByText('reduced route content')).toBeInTheDocument();
  });
});
