import { useAppDispatch } from 'hooks/redux';
import ICard from 'interfaces/ICard';
import React from 'react';
import { fetchFirstEpisode, fetchLastEpisode, setSelectedCard } from 'store/reducers/cardSlice';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
  handleCardClick: () => void;
  setSelectedCardValue?: (card: ICard) => void;
}

const Card: React.FC<CardProps> = ({ card, handleCardClick, setSelectedCardValue }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const currentCard = { ...card };

    handleCardClick();

    if (setSelectedCardValue) {
      setSelectedCardValue(currentCard);

      return;
    }

    dispatch(setSelectedCard(currentCard));
    dispatch(fetchFirstEpisode());
    dispatch(fetchLastEpisode());
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
