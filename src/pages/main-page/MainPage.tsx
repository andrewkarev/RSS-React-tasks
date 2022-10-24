import React, { SyntheticEvent } from 'react';
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

interface MainPageState {
  searchQuery: string;
  searchFieldValue: string;
  cards: JSX.Element[] | null;
  isErrorOccured: boolean;
  isPending: boolean;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      searchFieldValue: localStorage.getItem('searchQuery') || '',
      cards: null,
      isErrorOccured: false,
      isPending: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
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
          toggleModalWindow={this.props.toggleModalWindow}
          setSelectedCardValue={this.props.setSelectedCardValue}
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
      this.setState(() => {
        return { cards: [], isErrorOccured: true, isPending: false };
      });
    }
  }

  async componentDidMount() {
    await this.updateCards();
  }

  async componentDidUpdate(_: Readonly<MainPageProps>, prevState: Readonly<MainPageState>) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      await this.updateCards();
    }
  }

  render() {
    const popUp = (
      <PopUp card={this.props.selectedCard} toggleModalWindow={this.props.toggleModalWindow} />
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
        {this.props.isModalOpened && popUp}
      </div>
    );
  }
}

export default MainPage;
