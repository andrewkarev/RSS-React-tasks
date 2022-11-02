import AppActionKind from 'common/enums/app-action-kind';
import { useAppDispatch } from 'context/AppContext';
import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
  setSelectedCardValue?: (card: ICard) => void;
  handleCardClick?: () => void;
}

const Card: React.FC<CardProps> = ({ card, setSelectedCardValue, handleCardClick }) => {
  const appDispatch = useAppDispatch();

  const handleClick = () => {
    const currentCard = { ...card };

    if (handleCardClick) {
      handleCardClick();
    }

    if (setSelectedCardValue) {
      setSelectedCardValue(currentCard);
    }

    appDispatch({
      type: AppActionKind.SET_SELECTED_CARD,
      payload: { selectedCard: currentCard },
    });
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
