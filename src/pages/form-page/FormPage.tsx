import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { addCards } from 'store/reducers/formSlice';
import { v4 } from 'uuid';
import Card from 'components/card';
import Form from 'components/form';
import PopUp from 'components/pop-up/';
import ICard from 'interfaces/ICard';
import styles from './form-page.module.css';

const FormPage: React.FC = () => {
  const cards = useAppSelector((state) => state.form.cards);
  const dispatch = useAppDispatch();

  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const setSelectedCardValue = (card: ICard) => {
    setSelectedCard(() => card);
  };

  const toggleModalWindow = () => {
    const body = document.querySelector('body');

    if (!body) return;

    if (!isModalOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    setIsModalOpened((prevModalState) => !prevModalState);
  };

  const addNewCards = (newCard: ICard) => {
    dispatch(addCards(newCard));
  };

  const popUp = <PopUp card={selectedCard} toggleModalWindow={toggleModalWindow} />;
  const cardsElement = cards.map((card) => {
    return (
      <Card
        card={card}
        handleCardClick={toggleModalWindow}
        setSelectedCardValue={setSelectedCardValue}
        key={v4()}
      />
    );
  });

  return (
    <div className={styles['form-page']} data-testid={'form-page'}>
      <h2 className={styles['form-page-title']}>Create new character</h2>
      <div className={styles['form-container']}>
        <Form addNewCards={addNewCards} />
      </div>
      <div className={styles['cards-container']}>{cardsElement}</div>
      {isModalOpened && popUp}
    </div>
  );
};

export default FormPage;
