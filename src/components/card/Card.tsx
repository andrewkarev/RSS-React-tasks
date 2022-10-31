import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './card.module.css';

interface CardProps {
  card: ICard | null;
  toggleModalWindow: () => void;
  setSelectedCardValue: (card: ICard) => void;
}

class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const card = { ...this.props.card };

    this.props.toggleModalWindow();
    this.props.setSelectedCardValue(card);
  }

  render() {
    return (
      <div className={styles['card']} onClick={this.handleCardClick} data-testid={'card'}>
        <div className={styles['img-wrapper']}>
          <img className={styles['img']} src={this.props.card?.image} alt="Character avatar" />
        </div>
        <h3 className={styles['name']}>{this.props.card?.name}</h3>
        <button className={styles['card-btn']} type="button" data-testid={'card-btn'}>
          Show details
        </button>
      </div>
    );
  }
}

export default Card;
