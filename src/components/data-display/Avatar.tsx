'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';

import { cn } from '@/lib/cn';

/**
 * Avatar — a user/entity image with a text fallback (Bible §09, Sprint 02 §07).
 *
 * Purpose:      Show a person/org image that degrades to initials when the image
 *               is missing or slow, on Radix Avatar for the load lifecycle.
 * Public API:   `src`, `name`, `size`, `className`.
 * Props:        `src`, `name`, `size`; ≤ 7 total.
 * Variants:     size — sm | md | lg (square, radius-0 per Bible §09 avatars).
 * States:       image loading → fallback initials → image shown.
 * A11y:         `name` is the alt text and the source of the fallback initials;
 *               a decorative avatar can pass an empty name.
 * Responsive:   Fixed size from the scale.
 * Composition:  Beside a name/role in list rows and cards.
 */
type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  /** Full name — alt text and initials source. */
  name: string;
  size?: AvatarSize;
  className?: string;
}

const SIZE: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-small',
  md: 'h-11 w-11 text-body',
  lg: 'h-14 w-14 text-h3',
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  return (
    <RadixAvatar.Root
      className={cn(
        'bg-sunken text-graphite inline-flex items-center justify-center overflow-hidden rounded-none align-middle select-none',
        SIZE[size],
        className,
      )}
    >
      <RadixAvatar.Image
        src={src}
        alt={name}
        className="h-full w-full object-cover"
      />
      <RadixAvatar.Fallback
        delayMs={src ? 300 : 0}
        className="font-sans font-medium"
      >
        {initials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
