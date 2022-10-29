import React from 'react';
import AppPathesEnum from 'common/enums/app-pathes';
import CustomLink from 'components/custom-link';
import { useAppState } from 'context/AppContext';
import { useLocation } from 'react-router-dom';
import styles from './header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const appState = useAppState();

  const position =
    appState.mainPageCards.findIndex((card) => card.id === appState.selectedCard?.id) + 1;

  const positionElement = (
    <div className={styles['position-info']}>
      <p>
        <span className={styles['info-title']}>Page: </span>
        {appState.mainPageControlsValues.pageNumber}
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
