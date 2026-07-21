import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { axe } from '@/tests/axe';

import { ArchitecturePanel } from './ArchitecturePanel';

/**
 * ArchitecturePanel a11y tests (Sprint 15 §02/§06 — diagram semantics).
 *
 * The panel is used as a real architecture diagram (home page). Sprint 15 gave
 * each layer's node chips real `<ul>`/`<li>` semantics labelled by the layer
 * name, so AT announces the layer, the node count and the list boundaries
 * rather than a flat run of text. These tests lock that structure in.
 */
function Sample() {
  return (
    <ArchitecturePanel title="TranspaHire — system overview">
      <ArchitecturePanel.Layer label="Client">
        <ArchitecturePanel.Node>Next.js</ArchitecturePanel.Node>
        <ArchitecturePanel.Node>React</ArchitecturePanel.Node>
      </ArchitecturePanel.Layer>
      <ArchitecturePanel.Layer label="Services">
        <ArchitecturePanel.Node>NestJS</ArchitecturePanel.Node>
        <ArchitecturePanel.Node>FastAPI</ArchitecturePanel.Node>
        <ArchitecturePanel.Node>Postgres</ArchitecturePanel.Node>
      </ArchitecturePanel.Layer>
    </ArchitecturePanel>
  );
}

describe('ArchitecturePanel — diagram semantics (§02/§06)', () => {
  it('renders as a figure with a caption', () => {
    const { container } = render(<Sample />);
    const figure = screen.getByRole('figure');
    expect(figure).toBeInTheDocument();
    // The caption is the diagram's visible title (figcaption → figure name).
    const caption = container.querySelector('figcaption');
    expect(caption).toHaveTextContent('TranspaHire — system overview');
  });

  it('exposes each layer as a list labelled by the layer name, with one item per node', () => {
    render(<Sample />);
    const client = screen.getByRole('list', { name: 'Client' });
    expect(within(client).getAllByRole('listitem')).toHaveLength(2);
    const services = screen.getByRole('list', { name: 'Services' });
    expect(within(services).getAllByRole('listitem')).toHaveLength(3);
  });

  it('has no axe violations (gate G2)', async () => {
    const { container } = render(<Sample />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
