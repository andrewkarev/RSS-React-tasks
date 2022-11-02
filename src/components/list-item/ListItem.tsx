import AppPathesEnum from 'common/enums/app-pathes';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './list-item.module.css';

interface ListItemProps {
  annotation?: string;
  info?: string;
}

const ListItem: React.FC<ListItemProps> = ({ annotation, info }) => {
  const location = useLocation();

  return (
    <li
      className={
        styles[
          `${location.pathname.includes(AppPathesEnum.form) ? 'list-item-modal' : 'list-item'}`
        ]
      }
    >
      <p
        className={
          styles[
            `${
              location.pathname.includes(AppPathesEnum.form)
                ? 'list-item-annotation-modal'
                : 'list-item-annotation'
            }`
          ]
        }
      >
        {annotation || 'not settled'}
      </p>
      <p
        className={
          styles[
            `${
              location.pathname.includes(AppPathesEnum.form)
                ? 'list-item-info-modal'
                : 'list-item-info'
            }`
          ]
        }
      >
        {info || 'unknown'}
      </p>
    </li>
  );
};

export default ListItem;
