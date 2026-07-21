import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from '@/components/forms/Checkbox';

describe('Checkbox', () => {
  it('renders a labelled checkbox and toggles on click', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Subscribe" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox', { name: 'Subscribe' });
    expect(box).toBeInTheDocument();
    await userEvent.click(box);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles via the associated label click', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Subscribe" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByText('Subscribe'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is keyboard-operable with Space', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Subscribe" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox');
    box.focus();
    await userEvent.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
