import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FieldWrapper } from '@/components/forms/FieldWrapper';
import { TextInput } from '@/components/forms/TextInput';

describe('FieldWrapper', () => {
  it('associates the label with the control', () => {
    render(
      <FieldWrapper label="Email">
        {(props) => <TextInput {...props} />}
      </FieldWrapper>,
    );
    // getByLabelText only succeeds if label↔control are wired.
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('ties helper text via aria-describedby when valid', () => {
    render(
      <FieldWrapper label="Email" helperText="Work address">
        {(props) => <TextInput {...props} />}
      </FieldWrapper>,
    );
    const input = screen.getByLabelText('Email');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const helper = document.getElementById(describedBy!);
    expect(helper).toHaveTextContent('Work address');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('exposes invalid state and points aria-describedby at the error', () => {
    render(
      <FieldWrapper label="Email" helperText="Work address" error="Required">
        {(props) => <TextInput {...props} />}
      </FieldWrapper>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = input.getAttribute('aria-describedby')!;
    expect(document.getElementById(describedBy)).toHaveTextContent('Required');
    // The error is announced via role="alert".
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('marks required fields programmatically', () => {
    render(
      <FieldWrapper label="Name" required>
        {(props) => <TextInput {...props} />}
      </FieldWrapper>,
    );
    expect(screen.getByLabelText(/Name/)).toHaveAttribute(
      'aria-required',
      'true',
    );
  });
});
