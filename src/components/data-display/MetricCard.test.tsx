import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MetricCard } from '@/components/data-display/MetricCard';

describe('MetricCard', () => {
  it('renders value and label', () => {
    render(<MetricCard value="99.9%" label="Uptime" />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
  });

  it('communicates trend direction with text, not colour alone', () => {
    render(
      <MetricCard
        value="12k"
        label="Users"
        trend={{ direction: 'up', delta: '+8%' }}
      />,
    );
    expect(screen.getByText('+8%')).toBeInTheDocument();
    // The accessible direction word is present for screen readers.
    expect(screen.getByText(/up/)).toBeInTheDocument();
  });
});
