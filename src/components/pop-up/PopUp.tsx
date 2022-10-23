import ListItem from 'components/list-item/ListItem';
import ICard from 'interfaces/ICard';
import React, { SyntheticEvent } from 'react';
import getDateOfCreation from 'utils/get-date-of-creation';
import styles from './pop-up.module.css';

interface PopUpProps {
  card: ICard | null;
  toggleModalWindow: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ card, toggleModalWindow }) => {
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
          <ListItem annotation={'status'} info={card?.status} />
          <ListItem annotation={'species'} info={card?.species} />
          <ListItem annotation={'gender'} info={card?.gender} />
          <ListItem annotation={'origin'} info={card?.origin?.name} />
          <ListItem annotation={'location'} info={card?.location?.name} />
          <ListItem annotation={'created'} info={getDateOfCreation(card?.created)} />
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
