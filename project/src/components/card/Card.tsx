import React from 'react';
import styles from './card.module.css';

interface CardProps {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
    this.getDateOfCreation = this.getDateOfCreation.bind(this);
  }

  getDateOfCreation() {
    const monthes = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dateOfCreation = new Date(this.props.created);
    const month = dateOfCreation.getMonth();
    const date = dateOfCreation.getDate();
    const year = dateOfCreation.getFullYear();

    return `${monthes[month]} ${date}, ${year}`;
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles['img-wrapper']}>
          <img className={styles.img} src={this.props.image} alt="Character avatar" />
        </div>
        <h3 className={styles.name}>{this.props.name}</h3>
        <ul className={styles.list}>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>status</p>
            <p className={styles['list-item-info']}>{this.props.status}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>species</p>
            <p className={styles['list-item-info']}>{this.props.species}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>gender</p>
            <p className={styles['list-item-info']}>{this.props.gender}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>origin</p>
            <p className={styles['list-item-info']}>{this.props.origin.name}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>location</p>
            <p className={styles['list-item-info']}>{this.props.location.name}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>created</p>
            <p className={styles['list-item-info']}>{this.getDateOfCreation()}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
