import React, { useCallback, useEffect, useState } from 'react';
import styles from './main-page.module.css';
import Card from 'components/card';
import getCharacters from 'services/get-characters-api';
import AppPathesEnum from 'common/enums/app-pathes';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/loader/';
import Controls from 'components/controls/';
import ICard from 'interfaces/ICard';
import sort from 'utils/sort';
import getQueryPageNumber from 'utils/get-query-page-number';
import getDataChunk from 'utils/get-data-chunk';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { addCards, setPagesQuantiy } from 'store/reducers/mainSlice';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.main.searchQuery);
  const pageNumber = useAppSelector((state) => state.main.pageNumber);
  const itemsOnPage = useAppSelector((state) => state.main.itemsOnPage);
  const sortingOrder = useAppSelector((state) => state.main.sortingOrder);
  const cards = useAppSelector((state) => state.main.cards);

  const navigate = useNavigate();

  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const setCards = useCallback(
    (data: ICard[]) => {
      dispatch(addCards(data));
    },
    [dispatch]
  );

  useEffect(() => {
    const updateCards = async () => {
      try {
        setCards([]);
        setIsPending(() => true);

        const page = getQueryPageNumber(pageNumber, itemsOnPage);
        const response = await getCharacters(searchQuery, page);
        const { results, info } = response;
        const pagesAtAll = Math.ceil(info.count / Number(itemsOnPage)).toString();

        dispatch(setPagesQuantiy(pagesAtAll));

        const sortedData = sort(results, sortingOrder);
        const data = getDataChunk(sortedData, pageNumber, itemsOnPage);

        setCards(data);
        setIsErrorOccured(() => false);
        setIsPending(() => false);
      } catch (error) {
        setIsErrorOccured(() => true);
        setIsPending(() => false);
      }
    };

    updateCards();
  }, [dispatch, setCards, itemsOnPage, pageNumber, searchQuery, sortingOrder]);

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
