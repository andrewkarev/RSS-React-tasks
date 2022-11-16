import AppPathesEnum from 'common/enums/app-pathes';
import ListItem from 'components/list-item';
import Loader from 'components/loader/';
import { useAppState } from 'context/AppContext';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getSeries from 'services/get-series-api';
import styles from './card-info-page.module.css';

export const CardInfoPage: React.FC = () => {
  const appState = useAppState();

  const [firstEpisodeName, setFirstEpisodeName] = useState('');
  const [lastEpisodeName, setLastEpisodeName] = useState('');

  const [isPending, setIsPending] = useState<boolean>(true);

  const navigate = useNavigate();

  const updateCards = useCallback(async () => {
    const firstEpisodeLink = appState.selectedCard?.episode?.at(0) || '';
    const lastEpisodeLink = appState.selectedCard?.episode?.at(-1) || '';

    if (!appState.selectedCard) {
      navigate(AppPathesEnum.home);
      return;
    }

    try {
      setIsPending(() => true);
      const firstEpisode = await getSeries(firstEpisodeLink);
      const lastEpisode =
        firstEpisodeLink === lastEpisodeLink ? firstEpisode : await getSeries(lastEpisodeLink);

      setFirstEpisodeName(() => firstEpisode.name || '');
      setLastEpisodeName(() => lastEpisode.name || '');

      setIsPending(() => false);
    } catch (error) {
      setIsPending(() => false);
    }
  }, [appState.selectedCard, navigate]);

  useEffect(() => {
    updateCards();
  }, [updateCards]);

  const characterInfo = (
    <div className={styles['card-info-page']}>
      <div className={styles['card-info-page-left-side']}>
        <div className={styles['img-wrapper']}>
          <img
            className={styles['img']}
            src={appState.selectedCard?.image}
            alt="Character avatar"
          />
        </div>
        <h3 className={styles['name']}>{appState.selectedCard?.name}</h3>
      </div>
      <div className={styles['card-info-page-right-side']}>
        <ul className={styles['list']}>
          <li className={styles['list-item']}>
            <div
              className={
                styles[
                  `${
                    appState.selectedCard?.status === 'Alive'
                      ? 'marker-alive'
                      : appState.selectedCard?.status === 'Dead'
                      ? 'marker-dead'
                      : 'marker'
                  }`
                ]
              }
            ></div>
            <p className={styles['list-item-info']}>
              {appState.selectedCard?.status} - {appState.selectedCard?.species}
            </p>
          </li>
          <ListItem annotation={'Place of origin:'} info={appState.selectedCard?.origin?.name} />
          <ListItem annotation={'First seen in:'} info={firstEpisodeName} />
          <ListItem annotation={'Last seen in:'} info={lastEpisodeName} />
          <ListItem
            annotation={'Last known location:'}
            info={appState.selectedCard?.location?.name}
          />
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

export default CardInfoPage;
