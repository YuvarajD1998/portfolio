import { describe, expect, it } from 'vitest';

import {
  allRoutePaths,
  footerColumns,
  primaryNav,
  resumeNav,
  routes,
} from '@/config/navigation';

describe('navigation model', () => {
  it('defines every route the IA requires (A1)', () => {
    const paths = allRoutePaths;
    for (const expected of [
      '/',
      '/about',
      '/projects',
      '/experience',
      '/skills',
      '/resume',
      '/contact',
      '/projects/transpahire',
      '/projects/transpahire/engineering',
    ]) {
      expect(paths).toContain(expected);
    }
  });

  it('nests the flagship + engineering under /projects', () => {
    expect(routes.transpahire.href).toBe('/projects/transpahire');
    expect(routes.transpahireEngineering.href).toBe(
      '/projects/transpahire/engineering',
    );
  });

  it('has exactly the four-item primary nav model (Work · About · Contact + Resume CTA)', () => {
    // Resume is separated so the header renders it as a CTA (P06 §04).
    expect(primaryNav.map((l) => l.label)).toEqual([
      'Work',
      'About',
      'Contact',
    ]);
    expect(primaryNav.find((l) => l.label === 'Work')?.href).toBe('/projects');
    expect(resumeNav.href).toBe('/resume');
  });

  it('gives every route a title and description for metadata', () => {
    for (const route of Object.values(routes)) {
      expect(route.title.length).toBeGreaterThan(0);
      expect(route.description.length).toBeGreaterThan(0);
    }
  });

  it('footer index links only to real routes', () => {
    const known = new Set(allRoutePaths);
    for (const column of footerColumns) {
      for (const link of column.links) {
        expect(known.has(link.href)).toBe(true);
      }
    }
  });
});
