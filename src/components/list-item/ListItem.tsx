import React from 'react';
import styles from './list-item.module.css';

interface ListItemProps {
  annotation?: string;
  info?: string;
}

const ListItem: React.FC<ListItemProps> = ({ annotation, info }) => {
  return (
    <li className={styles['list-item']}>
      <p className={styles['list-item-annotation']}>{annotation}</p>
      <p className={styles['list-item-info']}>{info}</p>
    </li>
  );
};

export default ListItem;
