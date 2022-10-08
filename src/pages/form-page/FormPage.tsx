import Form from 'components/form';
import React from 'react';
import styles from './form-page.module.css';

interface FormPageState {
  cards: JSX.Element[];
}

class FormPage extends React.Component<Record<string, never>, FormPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cards: [],
    };
    this.addNewCards = this.addNewCards.bind(this);
  }

  addNewCards(newCard: JSX.Element) {
    this.setState(({ cards }) => {
      return { cards: [...cards, newCard] };
    });
  }

  render() {
    return (
      <div className={styles['form-page']} data-testid={'form'}>
        <h2 className={styles['form-page-title']}>Create new character</h2>
        <div className={styles['form-container']}>
          <Form addNewCards={this.addNewCards} />
        </div>
        <div className={styles['cards-container']}>{this.state.cards}</div>
      </div>
    );
  }
}

export default FormPage;
