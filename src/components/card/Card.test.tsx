import React from 'react';
import { render, screen } from '@testing-library/react';
import cardsData from 'data/cards-data';
import Card from './Card';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  const setSelectedCardValueMock = jest.fn(() => {});
  const toggleModalWindowMock = jest.fn(() => {});
  const cardData = cardsData[0];
  const card = {
    id: cardData.id,
    name: cardData.name,
    status: cardData.status,
    species: cardData.species,
    type: cardData.type,
    gender: cardData.gender,
    origin: cardData.origin,
    location: cardData.location,
    image: cardData.image,
    episode: cardData.episode,
    url: cardData.url,
    created: cardData.created,
    key: cardData.name,
  };

  it('should render Card component', () => {
    render(
      <Card
        card={card}
        toggleModalWindow={toggleModalWindowMock}
        setSelectedCardValue={setSelectedCardValueMock}
      />
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('should contain element with character avatar', () => {
    render(
      <Card
        card={card}
        toggleModalWindow={toggleModalWindowMock}
        setSelectedCardValue={setSelectedCardValueMock}
      />
    );
    expect(screen.getByAltText(/Character avatar/i)).toBeInTheDocument();
  });

  it('should open modal window on card click', () => {
    render(
      <Card
        card={card}
        toggleModalWindow={toggleModalWindowMock}
        setSelectedCardValue={setSelectedCardValueMock}
      />
    );
    userEvent.click(screen.getByTestId('card'));
    expect(toggleModalWindowMock).toBeCalled();
    expect(setSelectedCardValueMock).toBeCalled();
  });
});
