import ICard from 'interfaces/ICard';
import React, { SyntheticEvent } from 'react';
import styles from './pop-up.module.css';

interface PopUpProps {
  card: ICard | null;
  toggleModalWindow: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ card, toggleModalWindow }) => {
  const getDateOfCreation = () => {
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

    if (!card?.created) return;

    const dateOfCreation = new Date(card.created);
    const month = dateOfCreation.getMonth();
    const date = dateOfCreation.getDate();
    const year = dateOfCreation.getFullYear();

    return `${monthes[month]} ${date}, ${year}`;
  };

  const closeModalWindow = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      toggleModalWindow();
    }
  };

  return (
    <div
      className={styles['pop-up-overlay']}
      onClick={closeModalWindow}
      data-testid={'pop-up-overlay'}
    >
      <div className={styles['pop-up']} data-testid={'pop-up'}>
        <div className={styles['pop-up-left-side']}>
          <div className={styles['img-wrapper']}>
            <img className={styles['img']} src={card?.image} alt="Character avatar" />
          </div>
          <h3 className={styles['name']}>{card?.name}</h3>
        </div>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>status</p>
            <p className={styles['list-item-info']}>{card?.status}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>species</p>
            <p className={styles['list-item-info']}>{card?.species}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>gender</p>
            <p className={styles['list-item-info']}>{card?.gender}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>origin</p>
            <p className={styles['list-item-info']}>{card?.origin?.name}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>location</p>
            <p className={styles['list-item-info']}>{card?.location?.name}</p>
          </li>
          <li className={styles['list-item']}>
            <p className={styles['list-item-annotation']}>created</p>
            <p className={styles['list-item-info']}>{getDateOfCreation()}</p>
          </li>
        </ul>
        <button className={styles['close-btn']} type="button" onClick={closeModalWindow}>
          <div
            className={`${styles['close-btn-line']} ${styles['close-btn-line-1']}`}
            onClick={closeModalWindow}
          ></div>
          <div
            className={`${styles['close-btn-line']} ${styles['close-btn-line-2']}`}
            onClick={closeModalWindow}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default PopUp;
