import ListItem from 'components/list-item/ListItem';
import ICard from 'interfaces/ICard';
import React, { SyntheticEvent } from 'react';
import getDateOfCreation from 'utils/get-date-of-creation';
import styles from './pop-up.module.css';

interface CardProps {
  card: ICard | null;
  toggleModalWindow: () => void;
}

class PopUp extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
    this.closeModalWindow = this.closeModalWindow.bind(this);
  }

  closeModalWindow(e: SyntheticEvent) {
    if (e.target === e.currentTarget) {
      this.props.toggleModalWindow();
    }
  }

  render() {
    return (
      <div
        className={styles['pop-up-overlay']}
        onClick={this.closeModalWindow}
        data-testid={'pop-up-overlay'}
      >
        <div className={styles['pop-up']} data-testid={'pop-up'}>
          <div className={styles['pop-up-left-side']}>
            <div className={styles['img-wrapper']}>
              <img className={styles['img']} src={this.props.card?.image} alt="Character avatar" />
            </div>
            <h3 className={styles['name']}>{this.props.card?.name}</h3>
          </div>
          <ul className={styles['list']}>
            <ListItem annotation={'status'} info={this.props.card?.status} />
            <ListItem annotation={'species'} info={this.props.card?.species} />
            <ListItem annotation={'gender'} info={this.props.card?.gender} />
            <ListItem annotation={'origin'} info={this.props.card?.origin?.name} />
            <ListItem annotation={'location'} info={this.props.card?.location?.name} />
            <ListItem annotation={'created'} info={getDateOfCreation(this.props.card?.created)} />
          </ul>
          <button className={styles['close-btn']} type="button" onClick={this.closeModalWindow}>
            <div
              className={`${styles['close-btn-line']} ${styles['close-btn-line-1']}`}
              onClick={this.closeModalWindow}
            ></div>
            <div
              className={`${styles['close-btn-line']} ${styles['close-btn-line-2']}`}
              onClick={this.closeModalWindow}
            ></div>
          </button>
        </div>
      </div>
    );
  }
}

export default PopUp;
