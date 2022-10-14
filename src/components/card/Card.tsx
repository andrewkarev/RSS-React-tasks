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
    const card = {
      id: this.props.card?.id,
      name: this.props.card?.name,
      status: this.props.card?.status,
      species: this.props.card?.species,
      type: this.props.card?.type,
      gender: this.props.card?.gender,
      origin: this.props.card?.origin,
      location: this.props.card?.location,
      image: this.props.card?.image,
      episode: this.props.card?.episode,
      url: this.props.card?.url,
      created: this.props.card?.created,
    };

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
