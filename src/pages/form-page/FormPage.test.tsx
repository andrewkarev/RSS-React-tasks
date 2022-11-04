import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormPage from '.';
import userEvent from '@testing-library/user-event';

class URLMock {
  createObjectURL() {
    return 'mocked image url';
  }
}

describe('FormPage', () => {
  const setSelectedCardValueMock = jest.fn(() => {});
  const toggleModalWindowMock = jest.fn(() => {});

  it('should render FormPage component', () => {
    render(
      <FormPage
        selectedCard={null}
        isModalOpened={false}
        setSelectedCardValue={setSelectedCardValueMock}
        toggleModalWindow={toggleModalWindowMock}
      />
    );
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
  });

  it('should contain title element', () => {
    render(
      <FormPage
        selectedCard={null}
        isModalOpened={false}
        setSelectedCardValue={setSelectedCardValueMock}
        toggleModalWindow={toggleModalWindowMock}
      />
    );
    expect(screen.getByText(/Create new character/i)).toBeInTheDocument();
  });

  it('should contain PopUp component', () => {
    render(
      <FormPage
        selectedCard={null}
        isModalOpened={true}
        setSelectedCardValue={setSelectedCardValueMock}
        toggleModalWindow={toggleModalWindowMock}
      />
    );

    expect(screen.queryByTestId('pop-up')).toBeInTheDocument();
  });

  it('should create a card in case of successful form validation', async () => {
    render(
      <FormPage
        selectedCard={null}
        isModalOpened={false}
        setSelectedCardValue={setSelectedCardValueMock}
        toggleModalWindow={toggleModalWindowMock}
      />
    );
    const MOCKED_URL_OBJECT = new URLMock();

    Object.defineProperty(window, 'URL', {
      value: MOCKED_URL_OBJECT,
    });

    expect(screen.getByTestId('submit-btn')).toBeDisabled();

    userEvent.type(screen.getByTestId('character-name'), 'name');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
    userEvent.type(screen.getByTestId('character-gender'), 'gender');
    userEvent.type(screen.getByTestId('character-origin'), 'origin');
    userEvent.type(screen.getByTestId('character-location'), 'location');
    fireEvent.change(screen.getByTestId('character-date'), { target: { value: '2020-05-24' } });
    userEvent.click(screen.getByTestId('agreement'));

    userEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });
});
