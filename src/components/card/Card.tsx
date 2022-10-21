import ListItem from 'components/list-item/ListItem';
import React from 'react';
import getDateOfCreation from 'utils/get-date-of-creation';
import styles from './card.module.css';

interface CardProps {
  id?: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: {
    name: string;
    url?: string;
  };
  location: {
    name: string;
    url?: string;
  };
  image: string;
  episode?: string[];
  url?: string;
  created: string;
}

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className={styles['card']} data-testid={'card'}>
        <div className={styles['img-wrapper']}>
          <img className={styles['img']} src={this.props.image} alt="Character avatar" />
        </div>
        <h3 className={styles['name']}>{this.props.name}</h3>
        <ul className={styles['list']}>
          <ListItem annotation={'status'} info={this.props.status} />
          <ListItem annotation={'species'} info={this.props.species} />
          <ListItem annotation={'gender'} info={this.props.gender} />
          <ListItem annotation={'origin'} info={this.props.origin.name} />
          <ListItem annotation={'location'} info={this.props.location.name} />
          <ListItem annotation={'created'} info={getDateOfCreation(this.props.created)} />
        </ul>
      </div>
    );
  }
}

export default Card;
