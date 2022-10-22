import React from 'react';
import styles from './list-item.module.css';

interface ListItemProps {
  annotation?: string;
  info?: string;
}

class ListItem extends React.Component<ListItemProps> {
  render() {
    return (
      <li className={styles['list-item']}>
        <p className={styles['list-item-annotation']}>{this.props.annotation}</p>
        <p className={styles['list-item-info']}>{this.props.info}</p>
      </li>
    );
  }
}

export default ListItem;
