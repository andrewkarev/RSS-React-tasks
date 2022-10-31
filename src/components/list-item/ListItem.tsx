import React from 'react';
import styles from './list-item.module.css';

interface ListItemProps {
  annotation?: string;
  info?: string;
}

const ListItem: React.FC<ListItemProps> = ({ annotation, info }) => {
  return (
    <li className={styles['list-item']}>
      <p className={styles['list-item-annotation']}>{annotation || 'not settled'}</p>
      <p className={styles['list-item-info']}>{info || 'unknown'}</p>
    </li>
  );
};

export default ListItem;
