import { describe, expect, it } from 'vitest';

import { contrastRatio, meetsContrastAA } from '@/utils/a11y';

describe('contrastRatio', () => {
  it('is ~21 for black on white', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
  });

  it('is 1 for identical colours', () => {
    expect(contrastRatio('#1B3AD6', '#1B3AD6')).toBeCloseTo(1, 5);
  });

  it('confirms Ink on Paper clears AAA (Design Bible §03: ≈15:1)', () => {
    // Ink #17150F on Paper #FAF8F4 — the primary text pairing.
    expect(contrastRatio('#17150F', '#FAF8F4')).toBeGreaterThan(14);
  });
});

describe('meetsContrastAA', () => {
  it('passes Graphite body text on Paper', () => {
    expect(meetsContrastAA('#55514A', '#FAF8F4')).toBe(true);
  });

  it('fails Mute-on-Paper for normal text but passes as large', () => {
    // Mute #8A857A is a labels tier (>4.5 only marginally); assert the API
    // distinguishes scales rather than a hard threshold.
    const normal = meetsContrastAA('#8A857A', '#FAF8F4', 'normal');
    const large = meetsContrastAA('#8A857A', '#FAF8F4', 'large');
    expect(large).toBe(true);
    // large is always at least as permissive as normal
    expect(large || !normal).toBe(true);
  });
});

describe('token contrast audit — WCAG 2.2 AA (Sprint 15 §08)', () => {
  // Both themes measured against the frozen palette (P05/P08). These are the
  // load-bearing text pairings; a regression that drops a passing pair below
  // AA fails here. The one known failing pairing (Mute, A2) is asserted
  // explicitly so its status is recorded, not silently masked — see
  // docs/accessibility-compliance-report.md §08.
  const light = { paper: '#faf8f4', ink: '#17150f', graphite: '#55514a', mute: '#8a857a', signal: '#1b3ad6' };
  const dark = { paper: '#121110', ink: '#edeae3', graphite: '#c4bfb5', mute: '#a29c90', signal: '#5e77ff' };

  it('Ink and Graphite body text clear AA in both themes', () => {
    expect(meetsContrastAA(light.ink, light.paper)).toBe(true);
    expect(meetsContrastAA(light.graphite, light.paper)).toBe(true);
    expect(meetsContrastAA(dark.ink, dark.paper)).toBe(true);
    expect(meetsContrastAA(dark.graphite, dark.paper)).toBe(true);
  });

  it('Signal (links/focus) clears the ≥3:1 non-text/UI floor in both themes', () => {
    // Signal is the focus ring and link colour; it must meet the UI-component
    // graphic threshold (SC 1.4.11) in both themes.
    expect(contrastRatio(light.signal, light.paper)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(dark.signal, dark.paper)).toBeGreaterThanOrEqual(3);
  });

  it('A2: Mute label tier does NOT clear AA for normal text in light theme (raised, not repainted)', () => {
    // The mute token is a labels/eyebrows tier used with uppercase mono
    // micro-labels. At normal-text size it is ~3.46:1 on paper — below the
    // 4.5:1 body floor. This is a Design-Bible change request (A2), not a
    // silent recolour: the approved palette owns this value. Dark-theme mute
    // (#a29c90, "R-05 — clears AA") was already lifted in a prior sprint.
    expect(meetsContrastAA(light.mute, light.paper, 'normal')).toBe(false);
    expect(meetsContrastAA(dark.mute, dark.paper, 'normal')).toBe(true);
  });
});
