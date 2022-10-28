import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from './main-page.module.css';
import Card from 'components/card';
import getCharacters from 'services/get-characters-api';
import { useAppDispatch, useAppState } from 'context/AppContext';
import AppActionKind from 'common/enums/app-action-kind';
import AppPathesEnum from 'common/enums/app-pathes';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/loader/';
import Controls from 'components/controls/Controls';

const MainPage: React.FC = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldValue = e.target.value;

    appDispatch({
      type: AppActionKind.SET_SEARCH_FIELD_VALUE,
      payload: { searchFieldValue: searchFieldValue },
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    appDispatch({
      type: AppActionKind.SET_SEARCH_QUERY,
      payload: { searchQuery: appState.searchFieldValue },
    });
  };

  useEffect(() => {
    const updateCards = async () => {
      try {
        appDispatch({
          type: AppActionKind.SET_MAIN_PAGE_CARDS,
          payload: { mainPageCards: [] },
        });
        setIsPending(() => true);

        const response = await getCharacters(appState.searchQuery);
        const data = response.results;

        appDispatch({
          type: AppActionKind.SET_MAIN_PAGE_CARDS,
          payload: { mainPageCards: data },
        });

        setIsErrorOccured(() => false);
        setIsPending(() => false);
      } catch (error) {
        appDispatch({
          type: AppActionKind.SET_MAIN_PAGE_CARDS,
          payload: { mainPageCards: [] },
        });

        setIsErrorOccured(() => true);
        setIsPending(() => false);
      }
    };

    updateCards();
  }, [appDispatch, appState.searchQuery]);

  const error = <h2 className={styles['error-message']}>There is no hero with that name</h2>;
  const cardContainer = (
    <div className={styles['cards-container']}>
      {appState.mainPageCards.map((item) => {
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
      <Controls handleChange={handleChange} handleSubmit={handleSubmit} />
      {isPending && <Loader />}
      {!isErrorOccured && cardContainer}
      {isErrorOccured && error}
    </div>
  );
};

export default MainPage;
