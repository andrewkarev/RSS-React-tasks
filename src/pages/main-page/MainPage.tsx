import React, { useEffect } from 'react';
import styles from './main-page.module.css';
import Card from 'components/card';
import AppPathesEnum from 'common/enums/app-pathes';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/loader/';
import Controls from 'components/controls/';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCharacters } from 'store/reducers/mainSlice';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.main.cards);
  const isErrorOccured = useAppSelector((state) => state.main.isErrorOccured);
  const isPending = useAppSelector((state) => state.main.isPending);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const error = <h2 className={styles['error-message']}>There is no hero with that name</h2>;
  const cardContainer = (
    <div className={styles['cards-container']}>
      {cards.map((item) => {
        const card = {
          id: item.id,
          name: item.name,
          status: item.status,
          species: item.species,
          type: item.type,
          gender: item.gender,
          origin: item.origin,
          location: item.location,
          image: item.image,
          episode: item.episode,
          url: item.url,
          created: item.created,
        };

        return (
          <Card
            card={card}
            key={item.id}
            handleCardClick={() => navigate(`/${AppPathesEnum.character}/${item.id}`)}
          />
        );
      })}
    </div>
  );

  return (
    <div className={styles['main-page']} data-testid={'main'}>
      <Controls />
      {isPending && <Loader />}
      {!!cards.length && cardContainer}
      {isErrorOccured && !cards.length && error}
    </div>
  );
};

export default MainPage;
