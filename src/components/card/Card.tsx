import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
  setSelectedCardValue: (card: ICard) => void;
  handleCardClick?: () => void;
}

const Card: React.FC<CardProps> = ({ card, setSelectedCardValue, handleCardClick }) => {
  const handleClick = () => {
    const currentCard = {
      id: card?.id,
      name: card?.name,
      status: card?.status,
      species: card?.species,
      type: card?.type,
      gender: card?.gender,
      origin: card?.origin,
      location: card?.location,
      image: card?.image,
      episode: card?.episode,
      url: card?.url,
      created: card?.created,
    };

    if (handleCardClick) {
      handleCardClick();
    }

    setSelectedCardValue(currentCard);
  };

  return (
    <div className={styles['card']} onClick={handleClick} data-testid={'card'}>
      <div className={styles['img-wrapper']}>
        <img className={styles['img']} src={card?.image} alt="Character avatar" />
      </div>
      <h3 className={styles['name']}>{card?.name}</h3>
      <button className={styles['card-btn']} type="button" data-testid={'card-btn'}>
        Show details
      </button>
    </div>
  );
};

export default Card;
