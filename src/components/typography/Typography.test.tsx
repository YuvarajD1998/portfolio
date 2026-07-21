import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Display } from '@/components/typography/Display';
import { Link } from '@/components/typography/Link';
import { List } from '@/components/typography/List';

describe('Display', () => {
  it('renders an h1 by default', () => {
    render(<Display>Title</Display>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Title',
    );
  });
});

describe('Link', () => {
  it('adds safe rel + target for external URLs', () => {
    render(<Link href="https://example.com">Out</Link>);
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('leaves internal links untargeted', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).not.toHaveAttribute('target');
  });
});

describe('List', () => {
  it('renders a semantic list with items', () => {
    render(
      <List variant="ordered">
        <List.Item>One</List.Item>
        <List.Item>Two</List.Item>
      </List>,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
