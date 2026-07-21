import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useActiveSection } from '@/hooks/useActiveSection';

type IOCallback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;

let latestCallback: IOCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IOCallback) {
    latestCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('useActiveSection', () => {
  beforeEach(() => {
    latestCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    // Two anchored sections in the document for the observer to track.
    document.body.innerHTML = `<div id="a"></div><div id="b"></div>`;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('defaults to the first section', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    expect(result.current).toBe('a');
  });

  it('activates the section reported as intersecting', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    act(() => {
      latestCallback?.([
        { target: document.getElementById('b')!, isIntersecting: true },
      ]);
    });
    expect(result.current).toBe('b');
  });

  it('prefers the first-in-document section when several intersect', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    act(() => {
      latestCallback?.([
        { target: document.getElementById('b')!, isIntersecting: true },
        { target: document.getElementById('a')!, isIntersecting: true },
      ]);
    });
    expect(result.current).toBe('a');
  });
});
