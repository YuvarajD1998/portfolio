import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/overlays/Dialog';

function Example() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent title="Confirm" description="Are you sure?">
        <DialogClose>Cancel</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('is closed until the trigger is activated', () => {
    render(<Example />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger and is labelled by its title + description', async () => {
    render(<Example />);
    await userEvent.click(screen.getByText('Open'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName('Confirm');
    expect(dialog).toHaveAccessibleDescription('Are you sure?');
  });

  it('dismisses on Escape', async () => {
    render(<Example />);
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes via a DialogClose control', async () => {
    render(<Example />);
    await userEvent.click(screen.getByText('Open'));
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // S14 §10 — the icon-only close control must carry a ≥44px hit box so it is
  // reliably tappable on touch, even though its glyph is smaller.
  it('gives the close control a 44px touch target', async () => {
    render(<Example />);
    await userEvent.click(screen.getByText('Open'));
    const close = screen.getByRole('button', { name: 'Close dialog' });
    expect(close.className).toMatch(/\bh-11\b/);
    expect(close.className).toMatch(/\bw-11\b/);
  });
});
