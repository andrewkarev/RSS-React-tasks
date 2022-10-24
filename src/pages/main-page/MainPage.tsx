import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from './main-page.module.css';
import Card from 'components/card';
import SearchField from 'components/search-field';
import PopUp from 'components/pop-up/';
import ICard from 'interfaces/ICard';
import getCharacters from 'services/get-characters-api';

interface MainPageProps {
  selectedCard: ICard | null;
  isModalOpened: boolean;
  setSelectedCardValue: (card: ICard) => void;
  toggleModalWindow: () => void;
}

const MainPage: React.FC<MainPageProps> = (props) => {
  const initialValue = () => {
    return localStorage.getItem('searchQuery') || '';
  };

  const [searchQuery, setSearchQuery] = useState(() => initialValue());
  const [searchFieldValue, setSearchFieldValue] = useState(() => initialValue());
  const [cards, setCards] = useState<ICard[]>([]);
  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldValue = e.target.value;

    setSearchFieldValue(() => searchFieldValue);
    localStorage.setItem('searchQuery', searchFieldValue);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearchQuery(() => searchFieldValue);
  };

  useEffect(() => {
    const updateCards = async () => {
      try {
        setCards(() => []);
        setIsPending(() => true);

        const data = await getCharacters(searchQuery);

        setCards(() => data);
        setIsErrorOccured(() => false);
        setIsPending(() => false);
      } catch (error) {
        setCards(() => []);
        setIsErrorOccured(() => true);
        setIsPending(() => false);
      }
    };

    updateCards();
  }, [searchQuery]);

  const popUp = <PopUp card={props.selectedCard} toggleModalWindow={props.toggleModalWindow} />;
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
            toggleModalWindow={props.toggleModalWindow}
            setSelectedCardValue={props.setSelectedCardValue}
            key={item.id}
          />
        );
      })}
    </div>
  );
  const loader = <div className={styles['loader']}></div>;
  return (
    <div className={styles['main-page']} data-testid={'main'}>
      <SearchField
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        currentValue={searchFieldValue}
      />
      {isPending && loader}
      {!isErrorOccured && cardContainer}
      {isErrorOccured && error}
      {props.isModalOpened && popUp}
    </div>
  );
};

export default MainPage;
