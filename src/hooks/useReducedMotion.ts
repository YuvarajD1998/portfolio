'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Whether the user prefers reduced motion.
 *
 * The single gate for all motion primitives (Blueprint §12): honouring the OS
 * setting is structural, not per-usage. When true, presets replace movement
 * with instant opacity and never carry meaning by motion alone.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
