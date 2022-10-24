import Form from 'components/form';
import PopUp from 'components/pop-up/';
import ICard from 'interfaces/ICard';
import React from 'react';
import styles from './form-page.module.css';

interface FormPageProps {
  selectedCard: ICard | null;
  isModalOpened: boolean;
  setSelectedCardValue: (card: ICard) => void;
  toggleModalWindow: () => void;
}

interface FormPageState {
  cards: JSX.Element[];
  isModalOpened: boolean;
}

class FormPage extends React.Component<FormPageProps, FormPageState> {
  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      cards: [],
      isModalOpened: false,
    };
    this.addNewCards = this.addNewCards.bind(this);
  }

  addNewCards(newCard: JSX.Element) {
    this.setState(({ cards }) => {
      return { cards: [...cards, newCard] };
    });
  }

  render() {
    const popUp = (
      <PopUp card={this.props.selectedCard} toggleModalWindow={this.props.toggleModalWindow} />
    );

    return (
      <div className={styles['form-page']} data-testid={'form-page'}>
        <h2 className={styles['form-page-title']}>Create new character</h2>
        <div className={styles['form-container']}>
          <Form
            addNewCards={this.addNewCards}
            setSelectedCardValue={this.props.setSelectedCardValue}
            toggleModalWindow={this.props.toggleModalWindow}
          />
        </div>
        <div className={styles['cards-container']}>{this.state.cards}</div>
        {this.props.isModalOpened && popUp}
      </div>
    );
  }
}

export default FormPage;
