import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from '@/components/primitives';

describe('Heading', () => {
  it('renders the semantic level from `as`, independent of visual size', () => {
    render(
      <Heading as="h1" size="h2">
        Title
      </Heading>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Title');
  });

  it('forwards a custom className', () => {
    render(
      <Heading as="h2" className="custom">
        X
      </Heading>,
    );
    expect(screen.getByRole('heading')).toHaveClass('custom');
  });
});
