import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { WebVitals } from './WebVitals';

// The reporter reads metrics through Next's hook; stub it so the test does not
// depend on a real navigation timeline.
vi.mock('next/web-vitals', () => ({
  useReportWebVitals: vi.fn(),
}));

describe('WebVitals', () => {
  it('renders nothing — it is an inert instrument, no visual output (S16 §15)', () => {
    const { container } = render(<WebVitals />);
    expect(container).toBeEmptyDOMElement();
  });
});
