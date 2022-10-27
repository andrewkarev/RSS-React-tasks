import React from 'react';
import { render, screen } from '@testing-library/react';
import cardsData from 'data/cards-data';
import Card from './Card';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  const toggleModalWindowMock = jest.fn(() => {});
  const cardData = cardsData[0];

  beforeEach(() => {
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
    render(<Card card={card} handleCardClick={toggleModalWindowMock} />);
  });

  it('should render Card component', () => {
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('should contain element with character avatar', () => {
    expect(screen.getByAltText(/Character avatar/i)).toBeInTheDocument();
  });

  it('should open modal window on card click', () => {
    userEvent.click(screen.getByTestId('card'));
    expect(toggleModalWindowMock).toBeCalled();
  });
});
