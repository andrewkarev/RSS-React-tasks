import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './pop-up.module.css';

interface CardProps {
  card: ICard | null;
  toggleModalWindow: () => void;
}

class PopUp extends React.Component<CardProps> {
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

    if (!this.props.card?.created) return;

    const dateOfCreation = new Date(this.props.card.created);
    const month = dateOfCreation.getMonth();
    const date = dateOfCreation.getDate();
    const year = dateOfCreation.getFullYear();

    return `${monthes[month]} ${date}, ${year}`;
  }

  render() {
    return (
      <div className={styles['pop-up-overlay']}>
        <div className={styles['pop-up']} data-testid={'pop-up'}>
          <div className={styles['pop-up-left-side']}>
            <div className={styles['img-wrapper']}>
              <img className={styles['img']} src={this.props.card?.image} alt="Character avatar" />
            </div>
            <h3 className={styles['name']}>{this.props.card?.name}</h3>
          </div>
          <ul className={styles['list']}>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>status</p>
              <p className={styles['list-item-info']}>{this.props.card?.status}</p>
            </li>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>species</p>
              <p className={styles['list-item-info']}>{this.props.card?.species}</p>
            </li>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>gender</p>
              <p className={styles['list-item-info']}>{this.props.card?.gender}</p>
            </li>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>origin</p>
              <p className={styles['list-item-info']}>{this.props.card?.origin?.name}</p>
            </li>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>location</p>
              <p className={styles['list-item-info']}>{this.props.card?.location?.name}</p>
            </li>
            <li className={styles['list-item']}>
              <p className={styles['list-item-annotation']}>created</p>
              <p className={styles['list-item-info']}>{this.getDateOfCreation()}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PopUp;
