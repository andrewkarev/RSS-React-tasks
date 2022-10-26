import AppActionKind from 'common/enums/app-action-kind';
import Card from 'components/card';
import Form from 'components/form';
import PopUp from 'components/pop-up/';
import { useAppDispatch, useAppState } from 'context/AppContext';
import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './form-page.module.css';

interface FormPageProps {
  selectedCard: ICard | null;
  isModalOpened: boolean;
  setSelectedCardValue: (card: ICard) => void;
  toggleModalWindow: () => void;
}

const FormPage: React.FC<FormPageProps> = (props) => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const addNewCards = (newCard: ICard) => {
    appDispatch({
      type: AppActionKind.SET_FORM_PAGE_CARDS,
      payload: { formPageCards: [newCard] },
    });
  };

  const popUp = <PopUp card={props.selectedCard} toggleModalWindow={props.toggleModalWindow} />;
  const cardsElement = appState.formPageCards.map((card, i) => {
    return (
      <Card
        card={card}
        handleCardClick={props.toggleModalWindow}
        setSelectedCardValue={props.setSelectedCardValue}
        key={i}
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
      {props.isModalOpened && popUp}
    </div>
  );
};

export default FormPage;
