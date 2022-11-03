import AppPathesEnum from 'common/enums/app-pathes';
import ListItem from 'components/list-item';
import Loader from 'components/loader/';
import { useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './card-info-page.module.css';

export const CardDetailsPage: React.FC = () => {
  const selectedCard = useAppSelector((state) => state.card.selectedCard);
  const firstEpisodeTitle = useAppSelector((state) => state.card.firstEpisodeTitle);
  const lastEpisodeTitle = useAppSelector((state) => state.card.lastEpisodeTitle);
  const isPending = useAppSelector((state) => state.card.isPending);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCard) {
      navigate(AppPathesEnum.home);
      return;
    }
  }, [navigate, selectedCard]);

  const characterInfo = (
    <div className={styles['card-info-page']}>
      <div className={styles['card-info-page-left-side']}>
        <div className={styles['img-wrapper']}>
          <img className={styles['img']} src={selectedCard?.image} alt="Character avatar" />
        </div>
        <h3 className={styles['name']}>{selectedCard?.name}</h3>
      </div>
      <div className={styles['card-info-page-right-side']}>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <div
              className={
                styles[
                  `${
                    selectedCard?.status === 'Alive'
                      ? 'marker-alive'
                      : selectedCard?.status === 'Dead'
                      ? 'marker-dead'
                      : 'marker'
                  }`
                ]
              }
            ></div>
            <p className={styles['list-item-info']}>
              {selectedCard?.status} - {selectedCard?.species}
            </p>
          </li>
          <ListItem annotation={'Place of origin:'} info={selectedCard?.origin?.name} />
          <ListItem annotation={'First seen in:'} info={firstEpisodeTitle} />
          <ListItem annotation={'Last seen in:'} info={lastEpisodeTitle} />
          <ListItem annotation={'Last known location:'} info={selectedCard?.location?.name} />
        </ul>
        <button
          className={styles['back-btn']}
          type="button"
          onClick={() => navigate(AppPathesEnum.home)}
        >
          Go back
        </button>
      </div>
    </div>
  );

  return <>{isPending ? <Loader /> : characterInfo}</>;
};

export default CardDetailsPage;
