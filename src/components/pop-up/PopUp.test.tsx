import React from 'react';
import { render, screen } from '@testing-library/react';
import PopUp from './';
import cardsData from 'data/cards-data';
import userEvent from '@testing-library/user-event';

describe('PopUp', () => {
  const toggleModalWindowMock = jest.fn(() => {});
  const card = cardsData[0];

  it('should render PopUp component', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByTestId('pop-up')).toBeInTheDocument();
  });

  it('should contain status element', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('should contain species element', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/species/i)).toBeInTheDocument();
  });

  it('should contain gender element', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });

  it('should contain origin element', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/origin/i)).toBeInTheDocument();
  });

  it('should contain location element', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/location/i)).toBeInTheDocument();
  });

  it('should contain element with date of creation', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByText(/created/i)).toBeInTheDocument();
  });

  it('should contain element with character avatar', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    expect(screen.getByAltText(/Character avatar/i)).toBeInTheDocument();
  });

  it('should be closed after clicking on the overlay', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    userEvent.click(screen.getByTestId('pop-up-overlay'));
    expect(toggleModalWindowMock).toBeCalled();
  });

  it('should be closed on close button click', () => {
    render(<PopUp card={card} toggleModalWindow={toggleModalWindowMock} />);
    userEvent.click(screen.getByRole('button'));
    expect(toggleModalWindowMock).toBeCalled();
  });
});
