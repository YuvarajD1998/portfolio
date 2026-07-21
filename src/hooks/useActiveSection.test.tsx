import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useActiveSection } from '@/hooks/useActiveSection';

// Drive the hook by controlling each section's getBoundingClientRect().top,
// then firing a scroll event — this mirrors how the hook actually measures the
// active section (direct position read on scroll), independent of any observer.
function setTop(id: string, top: number) {
  const el = document.getElementById(id)!;
  el.getBoundingClientRect = () =>
    ({ top, bottom: top + 100, height: 100 }) as DOMRect;
}

describe('useActiveSection', () => {
  beforeEach(() => {
    // rAF fires synchronously so the post-mount evaluation runs within act().
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    vi.stubGlobal('cancelAnimationFrame', () => {});
    document.body.innerHTML = `<div id="a"></div><div id="b"></div>`;
    // Both sections start below the activation line (not yet scrolled to).
    setTop('a', 500);
    setTop('b', 900);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('defaults to the first section', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    expect(result.current).toBe('a');
  });

  it('activates the section scrolled past the header line', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    act(() => {
      // Both a and b have scrolled above the activation line; b is the last one
      // past it, so b is current.
      setTop('a', -200);
      setTop('b', 10);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('b');
  });

  it('keeps the first-in-document section when several are past the line', () => {
    const { result } = renderHook(() => useActiveSection(['a', 'b']));
    act(() => {
      // Only a is above the line; b is still below it, so a stays current.
      setTop('a', -50);
      setTop('b', 300);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('a');
  });
});
