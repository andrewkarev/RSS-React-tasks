import React from 'react';
import { render, screen } from '@testing-library/react';
import PopUp from './PopUp';
import cardsData from 'data/cards-data';
import userEvent from '@testing-library/user-event';

describe('PopUp', () => {
  const toggleModalWindowMock = jest.fn(() => {});
  const card = cardsData[0];

  beforeEach(() => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
  });

  it('should render PopUp component', () => {
    expect(screen.getByTestId('pop-up')).toBeInTheDocument();
  });

  it('should contain status element', () => {
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('should contain species element', () => {
    expect(screen.getByText(/species/i)).toBeInTheDocument();
  });

  it('should contain gender element', () => {
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });

  it('should contain origin element', () => {
    expect(screen.getByText(/origin/i)).toBeInTheDocument();
  });

  it('should contain location element', () => {
    expect(screen.getByText(/location/i)).toBeInTheDocument();
  });

  it('should contain element with date of creation', () => {
    expect(screen.getByText(/created/i)).toBeInTheDocument();
  });

  it('should contain element with character avatar', () => {
    expect(screen.getByAltText(/Character avatar/i)).toBeInTheDocument();
  });

  it('should be closed after clicking on the overlay', () => {
    userEvent.click(screen.getByTestId('pop-up-overlay'));
    expect(toggleModalWindowMock).toBeCalled();
  });

  it('should be closed on close button click', () => {
    userEvent.click(screen.getByRole('button'));
    expect(toggleModalWindowMock).toBeCalled();
  });
});
