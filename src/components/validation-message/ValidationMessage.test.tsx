import React from 'react';
import { render, screen } from '@testing-library/react';
import ValidationMessage from '.';

describe('ValidationMessage', () => {
  const mockMessage = 'Validation error message';
  let mockValidationValue = true;

  it('should render ValidationMessage component', () => {
    render(<ValidationMessage isValid={mockValidationValue} message={mockMessage} />);
    expect(screen.getByTestId('validation-message')).toBeInTheDocument();
  });

  it('should contain appropriate class name in case of successful validation', () => {
    mockValidationValue = true;
    render(<ValidationMessage isValid={mockValidationValue} message={mockMessage} />);
    expect(screen.getByTestId('validation-message')).toHaveClass('validation-error-message');
  });

  it('should contain appropriate class name in case of failed validation', () => {
    mockValidationValue = false;
    render(<ValidationMessage isValid={mockValidationValue} message={mockMessage} />);
    expect(screen.getByTestId('validation-message')).toHaveClass('validation-error-message-active');
  });
});
