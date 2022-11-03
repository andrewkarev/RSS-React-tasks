import React from 'react';
import AppPathesEnum from 'common/enums/app-pathes';
import CustomLink from 'components/custom-link';
import { useLocation } from 'react-router-dom';
import styles from './header.module.css';
import { useAppSelector } from 'hooks/redux';

const Header: React.FC = () => {
  const location = useLocation();

  const selectedCard = useAppSelector((state) => state.card.selectedCard);
  const pageNumber = useAppSelector((state) => state.main.pageNumber);
  const cards = useAppSelector((state) => state.main.cards);

  const position = cards.findIndex((card) => card.id === selectedCard?.id) + 1;

  const positionElement = (
    <div className={styles['position-info']}>
      <p>
        <span className={styles['info-title']}>Page: </span>
        {pageNumber}
      </p>
      <div className={styles['vertical-line']}></div>
      <p>
        <span className={styles['info-title']}>Position: </span>
        {position}
      </p>
    </div>
  );

  return (
    <header className={styles['header']} data-testid={'header'}>
      <div className="container">
        <div className={styles['header-content-wrapper']}>
          <nav className={styles['header-links']}>
            <CustomLink path={AppPathesEnum.home} title={'Home'} />
            <CustomLink path={AppPathesEnum.about} title={'About'} />
            <CustomLink path={AppPathesEnum.form} title={'Create'} />
          </nav>
          {location.pathname.includes(AppPathesEnum.character) && positionElement}
        </div>
      </div>
    </header>
  );
};

export default Header;
