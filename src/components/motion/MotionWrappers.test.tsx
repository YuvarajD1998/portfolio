import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  Fade,
  Hover,
  PageTransition,
  Press,
  Reveal,
  Scale,
  Slide,
  Stagger,
  StaggerItem,
} from './MotionWrappers';

/**
 * Motion wrapper tests (Sprint 13 §04, §12, §16).
 *
 * The wrappers are the single entrance/interaction vocabulary every page
 * consumes. Two invariants matter most and are enforced here:
 *
 *  1. Content presence — a primitive changes only how content appears, never
 *     whether it exists. The children must be in the DOM (and readable)
 *     regardless of motion state, so crawlers and AT always see them (§04).
 *  2. Reduced motion — with `prefers-reduced-motion` set, the same content is
 *     still fully present; meaning never rides on motion alone (§12).
 */
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

const wrappers = [
  ['Fade', Fade],
  ['Slide', Slide],
  ['Scale', Scale],
  ['Reveal', Reveal],
] as const;

describe('MotionWrappers — entrance primitives', () => {
  it.each(wrappers)(
    '%s renders its children (content present before/around motion)',
    (_name, Wrapper) => {
      mockReducedMotion(false);
      render(<Wrapper>visible content</Wrapper>);
      expect(screen.getByText('visible content')).toBeInTheDocument();
    },
  );

  it.each(wrappers)(
    '%s still renders its children under reduced motion',
    (_name, Wrapper) => {
      mockReducedMotion(true);
      render(<Wrapper>reduced content</Wrapper>);
      expect(screen.getByText('reduced content')).toBeInTheDocument();
    },
  );
});

describe('MotionWrappers — Stagger', () => {
  it('renders every staggered child in order', () => {
    mockReducedMotion(false);
    render(
      <Stagger>
        <StaggerItem>one</StaggerItem>
        <StaggerItem>two</StaggerItem>
        <StaggerItem>three</StaggerItem>
      </Stagger>,
    );
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();
  });

  it('renders all children under reduced motion (no child dropped)', () => {
    mockReducedMotion(true);
    render(
      <Stagger>
        <StaggerItem>a</StaggerItem>
        <StaggerItem>b</StaggerItem>
      </Stagger>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});

describe('MotionWrappers — interaction primitives', () => {
  it('Hover renders children in both motion states', () => {
    mockReducedMotion(false);
    const { rerender } = render(<Hover>hover me</Hover>);
    expect(screen.getByText('hover me')).toBeInTheDocument();
    mockReducedMotion(true);
    rerender(<Hover>hover me</Hover>);
    expect(screen.getByText('hover me')).toBeInTheDocument();
  });

  it('Press renders children in both motion states', () => {
    mockReducedMotion(false);
    const { rerender } = render(<Press>press me</Press>);
    expect(screen.getByText('press me')).toBeInTheDocument();
    mockReducedMotion(true);
    rerender(<Press>press me</Press>);
    expect(screen.getByText('press me')).toBeInTheDocument();
  });

  it('PageTransition renders route content in both motion states', () => {
    mockReducedMotion(false);
    const { rerender } = render(<PageTransition>route</PageTransition>);
    expect(screen.getByText('route')).toBeInTheDocument();
    mockReducedMotion(true);
    rerender(<PageTransition>route</PageTransition>);
    expect(screen.getByText('route')).toBeInTheDocument();
  });
});
