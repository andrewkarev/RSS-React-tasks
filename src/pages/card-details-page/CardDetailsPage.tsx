import AppPathesEnum from 'common/enums/app-pathes';
import ListItem from 'components/list-item';
import Loader from 'components/loader/';
import { useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getSeries from 'services/get-series-api';
import styles from './card-info-page.module.css';

export const CardDetailsPage: React.FC = () => {
  const selectedCard = useAppSelector((state) => state.card.selectedCard);

  const [firstEpisodeName, setFirstEpisodeName] = useState('');
  const [lastEpisodeName, setLastEpisodeName] = useState('');

  const [isPending, setIsPending] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCards = async () => {
      const firstEpisodeLink = selectedCard?.episode?.at(0) || '';
      const lastEpisodeLink = selectedCard?.episode?.at(-1) || '';

      if (!selectedCard) {
        navigate(AppPathesEnum.home);
        return;
      }

      try {
        setIsPending(() => true);

        const firstEpisode = await getSeries(firstEpisodeLink);
        const lastEpisode = await getSeries(lastEpisodeLink);

        setFirstEpisodeName(() => firstEpisode.name || '');
        setLastEpisodeName(() => lastEpisode.name || '');

        setIsPending(() => false);
      } catch (error) {
        setIsPending(() => false);
      }
    };

    updateCards();
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
          <ListItem annotation={'First seen in:'} info={firstEpisodeName} />
          <ListItem annotation={'Last seen in:'} info={lastEpisodeName} />
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
