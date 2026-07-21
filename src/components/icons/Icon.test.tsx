import { render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { Icon } from '@/components/icons';

describe('Icon', () => {
  it('is decorative (aria-hidden) without a label', () => {
    const { container } = render(<Icon icon={Search} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes an accessible name when labelled', () => {
    render(<Icon icon={Search} label="Search" />);
    const img = screen.getByRole('img', { name: 'Search' });
    expect(img).toBeInTheDocument();
  });

  it('renders at the default 20px size', () => {
    const { container } = render(<Icon icon={Search} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('renders the small (16px) size on request', () => {
    const { container } = render(<Icon icon={Search} size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '16');
  });
});
