import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormPage from '.';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event';

class URLMock {
  createObjectURL() {
    return 'mocked image url';
  }
}

describe('FormPage', () => {
  beforeEach(() => {
    render(<FormPage />);
  });

  it('should render FormPage component', () => {
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
  });

  it('should contain title element', () => {
    expect(screen.getByText(/Create new character/i)).toBeInTheDocument();
  });

  it('should create a card in case of successful form validation', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    const submitButton = screen.getByTestId('submit-btn');
    const MOCKED_URL_OBJECT = new URLMock();

    Object.defineProperty(window, 'URL', {
      value: MOCKED_URL_OBJECT,
    });

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();

    userEvent.type(screen.getByTestId('character-name'), 'name');
    userEvent.type(screen.getByTestId('character-gender'), 'gender');
    userEvent.type(screen.getByTestId('character-origin'), 'origin');
    userEvent.type(screen.getByTestId('character-location'), 'location');
    fireEvent.change(screen.getByTestId('character-date'), { target: { value: '2020-05-24' } });
    user.upload(screen.getByTestId('character-avatar'), file);
    userEvent.click(screen.getByTestId('agreement'));

    userEvent.click(submitButton);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('should enable submit button only after correcting all errors', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    const submitButton = screen.getByTestId('submit-btn');
    const MOCKED_URL_OBJECT = new URLMock();

    Object.defineProperty(window, 'URL', {
      value: MOCKED_URL_OBJECT,
    });

    userEvent.type(screen.getByTestId('character-name'), 'name');
    userEvent.type(screen.getByTestId('character-gender'), 'gender');
    userEvent.type(screen.getByTestId('character-origin'), 'origin');
    userEvent.type(screen.getByTestId('character-location'), 'location');

    userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByTestId('character-date'), { target: { value: '2020-05-24' } });
    user.upload(screen.getByTestId('character-avatar'), file);
    userEvent.click(screen.getByTestId('agreement'));

    expect(submitButton).not.toBeDisabled();
  });
});
