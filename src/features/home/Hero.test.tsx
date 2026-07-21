import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { hero } from '@/content/home';

import { Hero } from './Hero';

/**
 * Hero tests (Sprint 04 §03, §11).
 *
 * The hero holds the page's single <h1> and must read before any motion — its
 * copy is never gated behind animation, including under reduced motion.
 */
describe('Hero', () => {
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

  it('renders the full frozen headline as the single <h1>', () => {
    mockReducedMotion(false);
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // Word-by-word spans still concatenate to the full frozen line.
    expect(h1.textContent?.replace(/\s+/g, ' ').trim()).toBe(hero.headline);
  });

  it('renders the same headline under prefers-reduced-motion', () => {
    mockReducedMotion(true);
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent?.replace(/\s+/g, ' ').trim()).toBe(hero.headline);
    expect(screen.getByText(hero.role)).toBeInTheDocument();
  });
});
