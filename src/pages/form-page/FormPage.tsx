import Form from 'components/form';
import PopUp from 'components/pop-up/PopUp';
import ICard from 'interfaces/ICard';
import React, { useState } from 'react';
import styles from './form-page.module.css';

interface FormPageProps {
  selectedCard: ICard | null;
  isModalOpened: boolean;
  setSelectedCardValue: (card: ICard) => void;
  toggleModalWindow: () => void;
}

const FormPage: React.FC<FormPageProps> = (props) => {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  const addNewCards = (newCard: JSX.Element) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const popUp = <PopUp card={props.selectedCard} toggleModalWindow={props.toggleModalWindow} />;

  return (
    <div className={styles['form-page']} data-testid={'form-page'}>
      <h2 className={styles['form-page-title']}>Create new character</h2>
      <div className={styles['form-container']}>
        <Form
          addNewCards={addNewCards}
          setSelectedCardValue={props.setSelectedCardValue}
          toggleModalWindow={props.toggleModalWindow}
        />
      </div>
      <div className={styles['cards-container']}>{cards}</div>
      {props.isModalOpened && popUp}
    </div>
  );
};

export default FormPage;
