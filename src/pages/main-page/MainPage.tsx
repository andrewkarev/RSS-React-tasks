import React, { SyntheticEvent } from 'react';
import styles from './main-page.module.css';
import Card from 'components/card';
import SearchField from 'components/search-field';
import PopUp from 'components/pop-up/PopUp';
import ICard from 'interfaces/ICard';
import getCharacters from 'services/get-characters-api';
import { AxiosError } from 'axios';

interface MainPageState {
  searchQuery: string;
  searchFieldValue: string;
  cards: JSX.Element[] | null;
  isModalOpened: boolean;
  selectedCard: ICard | null;
  isErrorOccured: boolean;
  isPending: boolean;
}

class MainPage extends React.Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      searchFieldValue: localStorage.getItem('searchQuery') || '',
      cards: null,
      isModalOpened: false,
      selectedCard: null,
      isErrorOccured: false,
      isPending: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.toggleModalWindow = this.toggleModalWindow.bind(this);
    this.setSelectedCardValue = this.setSelectedCardValue.bind(this);
    this.updateCards = this.updateCards.bind(this);
  }

  toggleModalWindow() {
    const body = document.querySelector('body');

    if (!body) return;

    if (!this.state.isModalOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    this.setState(({ isModalOpened }) => {
      return { isModalOpened: !isModalOpened };
    });
  }

  setSelectedCardValue(card: ICard) {
    this.setState({
      selectedCard: card,
    });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchFieldValue = e.target.value;

    this.setState({ searchFieldValue });
    localStorage.setItem('searchQuery', searchFieldValue);
  }

  handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const searchQuery = this.state.searchFieldValue;
    this.setState({ searchQuery });
  }

  renderCards(data: ICard[]) {
    const cards = data.map((item) => {
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
          toggleModalWindow={this.toggleModalWindow}
          setSelectedCardValue={this.setSelectedCardValue}
          key={item.id}
        />
      );
    });

    this.setState(() => {
      return { cards, isErrorOccured: false, isPending: false };
    });
  }

  async updateCards() {
    try {
      this.setState({ cards: [], isPending: true });

      const data = await getCharacters(this.state.searchQuery);

      this.renderCards(data);
    } catch (error) {
      if (!(error instanceof AxiosError)) throw new Error();

      if (error.response?.status === 404) {
        this.setState(() => {
          return { cards: [], isErrorOccured: true, isPending: false };
        });
      }
    }
  }

  async componentDidMount() {
    await this.updateCards();
  }

  async componentDidUpdate(
    _: Readonly<Record<string, never>>,
    prevState: Readonly<{ searchQuery: string; cards: JSX.Element[] | null }>
  ) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      await this.updateCards();
    }
  }

  render() {
    const popUp = (
      <PopUp card={this.state.selectedCard} toggleModalWindow={this.toggleModalWindow} />
    );
    const error = <h2 className={styles['error-message']}>There is no hero with that name</h2>;
    const cardContainer = <div className={styles['cards-container']}>{this.state.cards}</div>;
    const loader = <div className={styles['loader']}></div>;

    return (
      <div className={styles['main-page']} data-testid={'main'}>
        <SearchField
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          currentValue={this.state.searchFieldValue}
        />
        {this.state.isPending && loader}
        {!this.state.isErrorOccured && cardContainer}
        {this.state.isErrorOccured && error}
        {this.state.isModalOpened && popUp}
      </div>
    );
  }
}

export default MainPage;
