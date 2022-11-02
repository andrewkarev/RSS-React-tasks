import { useAppDispatch } from 'hooks/redux';
import ICard from 'interfaces/ICard';
import React from 'react';
import { setSelectedCard } from 'store/reducers/detailsSlice';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
  setSelectedCardValue?: (card: ICard) => void;
  handleCardClick?: () => void;
}

const Card: React.FC<CardProps> = ({ card, setSelectedCardValue, handleCardClick }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const currentCard = { ...card };

    if (handleCardClick) {
      handleCardClick();
    }

    if (setSelectedCardValue) {
      setSelectedCardValue(currentCard);
    }

    dispatch(setSelectedCard(currentCard));
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
