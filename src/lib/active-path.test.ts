import { describe, expect, it } from 'vitest';

import { isActivePath } from '@/lib/active-path';

describe('isActivePath', () => {
  it('matches home only at the exact root', () => {
    expect(isActivePath('/', '/')).toBe(true);
    expect(isActivePath('/about', '/')).toBe(false);
    expect(isActivePath('/projects', '/')).toBe(false);
  });

  it('matches a section on its own path', () => {
    expect(isActivePath('/about', '/about')).toBe(true);
    expect(isActivePath('/projects', '/projects')).toBe(true);
  });

  it('keeps a parent active for nested paths', () => {
    // /projects → "Work" stays current inside a case study.
    expect(isActivePath('/projects/transpahire', '/projects')).toBe(true);
    expect(isActivePath('/projects/transpahire/engineering', '/projects')).toBe(
      true,
    );
  });

  it('does not match a sibling with a shared prefix', () => {
    expect(isActivePath('/projects-archive', '/projects')).toBe(false);
    expect(isActivePath('/aboutus', '/about')).toBe(false);
  });
});
