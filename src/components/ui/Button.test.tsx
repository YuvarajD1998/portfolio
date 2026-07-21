import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rocket } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';

describe('Button', () => {
  it('renders a real button and fires click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is activated by keyboard (Enter/Space)', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    btn.focus();
    expect(btn).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('marks loading as busy and disables interaction', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as an anchor via asChild (link that looks like a button)', () => {
    render(
      <Button asChild leadingIcon={Rocket}>
        <a href="/x">Launch</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Launch' });
    expect(link).toHaveAttribute('href', '/x');
    // The button styling must actually reach the anchor (Slot merge works).
    expect(link.className).toContain('bg-signal');
  });
});

describe('IconButton', () => {
  it('requires and exposes an accessible label', () => {
    render(<IconButton icon={Rocket} label="Launch" />);
    expect(screen.getByRole('button', { name: 'Launch' })).toBeInTheDocument();
  });
});
