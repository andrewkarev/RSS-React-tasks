import React from 'react';
import { render, screen } from '@testing-library/react';
import cardsData from 'data/cards-data';
import Card from './Card';

describe('Card', () => {
  const cardData = cardsData[0];

  it('should render Card component', () => {
    render(
      <Card
        id={cardData.id}
        name={cardData.name}
        status={cardData.status}
        species={cardData.species}
        type={cardData.type}
        gender={cardData.gender}
        origin={cardData.origin}
        location={cardData.location}
        image={cardData.image}
        episode={cardData.episode}
        url={cardData.url}
        created={cardData.created}
        key={cardData.name}
      />
    );

    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/species/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/origin/i)).toBeInTheDocument();
    expect(screen.getByText(/location/i)).toBeInTheDocument();
    expect(screen.getByText(/created/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Character avatar/i)).toBeInTheDocument();
  });
});
