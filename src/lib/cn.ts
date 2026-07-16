import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind conflict resolution.
 *
 * Combines `clsx` (conditional class composition) with `tailwind-merge`
 * (later utility wins over an earlier conflicting one), so callers can pass
 * a base class list and override selectively without specificity fights.
 * This is the only sanctioned way to compose classes (Blueprint §07).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-signal', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
