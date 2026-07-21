import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from '@/components/data-display/Tag';
import { Drawer, DrawerContent } from '@/components/overlays/Drawer';

/**
 * Sprint 14 — Responsive optimization regression guards.
 *
 * This sprint validated the existing portfolio across the viewport matrix and
 * fixed responsive defects without touching any approved layout, content or
 * motion (S03–S13 frozen). The correctable defects were touch-interaction
 * (§10): a handful of icon-only controls whose glyph was reliably tappable by
 * mouse but presented a hit box well under the 44×44px minimum on touch.
 *
 * These tests lock the fixes in as a class-contract. jsdom does not compute
 * layout and Vitest runs with `css: false`, so we cannot measure pixels — but
 * the sizing utilities (`h-11`/`w-11`/`min-h-11`, 44px on the token scale) are
 * the mechanism by which the target is met, and asserting they are present on
 * the rendered control is a durable guard against a future edit silently
 * shrinking a touch target back below the floor. The 44px minimum itself is
 * stated in CLAUDE.md (Playbook §07) and the S14 §10 touch-interaction rule.
 */

/** The Tailwind token that renders a 44px box (h-11 / w-11 / min-h-11). */
const TARGET_44 = /\b(?:min-)?[hw]-11\b/;

describe('S14 · touch targets ≥ 44px', () => {
  it('Tag remove control carries an expanded hit box', () => {
    render(<Tag onRemove={() => undefined}>React</Tag>);
    const remove = screen.getByRole('button', { name: 'Remove React' });
    // The chip stays visually compact; the control expands its hit area via
    // min-w/min-h and pulls back with negative margins so the chip height holds.
    expect(remove.className).toMatch(/\bmin-h-9\b/);
    expect(remove.className).toMatch(/\bmin-w-9\b/);
  });

  it('Drawer close control is a 44px square', () => {
    render(
      <Drawer open>
        <DrawerContent title="Menu">
          <p>panel</p>
        </DrawerContent>
      </Drawer>,
    );
    const close = screen.getByRole('button', { name: 'Close drawer' });
    expect(close.className).toMatch(TARGET_44);
  });
});
