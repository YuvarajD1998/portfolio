import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from '@/components/feedback/Alert';

describe('Alert', () => {
  it('uses role="alert" for assertive statuses (error/warning)', () => {
    render(
      <Alert status="error" title="Failed">
        Something broke.
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Failed');
    expect(alert).toHaveTextContent('Something broke.');
  });

  it('uses role="status" for polite statuses (info/success)', () => {
    render(<Alert status="success" title="Done" />);
    expect(screen.getByRole('status')).toHaveTextContent('Done');
  });

  it('renders an icon so meaning is not colour-only', () => {
    const { container } = render(<Alert status="warning" title="Careful" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
