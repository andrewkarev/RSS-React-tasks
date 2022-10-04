import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import cardsData from 'data/cards-data';

describe('MainPage', () => {
  let searchField: HTMLInputElement;

  beforeEach(() => {
    render(<MainPage />);
    searchField = screen.getByRole('textbox');
  });

  it('should render MainPage component', () => {
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('should contain search field', () => {
    expect(searchField).toBeInTheDocument();
  });

  it('should filter cards correctly', () => {
    userEvent.type(searchField, 'mort');

    const countCardsOnPage = () => screen.getAllByAltText(/Character avatar/).length;

    const initialCardsOnPage = countCardsOnPage();
    const appropriateCardsQuantity = cardsData.filter((card) =>
      card.name.toLowerCase().includes('mort')
    ).length;

    expect(initialCardsOnPage).toEqual(appropriateCardsQuantity);

    userEvent.clear(searchField);

    const currentCardsOnPage = countCardsOnPage();

    expect(currentCardsOnPage).toEqual(cardsData.length);
  });

  it('should display correct value in the search field', () => {
    expect(searchField).not.toHaveValue('Search query');
    userEvent.type(searchField, 'Search query');
    expect(searchField).toHaveValue('Search query');
  });
});
