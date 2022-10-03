import React from 'react';
import { render, screen } from '@testing-library/react';
import cardsData from 'data/cards-data';
import Card from './Card';

describe('Card', () => {
  const cardData = cardsData[0];

  beforeEach(() => {
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
  });

  it('should render Card component', () => {
    expect(screen.getByTestId('card')).toBeInTheDocument();
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
});
