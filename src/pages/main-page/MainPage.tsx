import React from 'react';
import styles from './main-page.module.css';
import cardsData from 'data/cards-data';
import Card from 'components/card';
import SearchField from 'components/search-field';

class MainPage extends React.Component<
  Record<string, never>,
  {
    searchQuery: string;
    cards: JSX.Element[] | null;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchQuery: localStorage.getItem('searchQuery') || '',
      cards: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.updateCardsValue = this.updateCardsValue.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }

  updateCardsValue() {
    this.setState(() => {
      return { cards: this.renderCards() };
    });
  }

  renderCards() {
    const cards = cardsData
      .filter((card) => {
        const validValue = this.state.searchQuery.toLowerCase();
        return card.name.toLowerCase().includes(validValue);
      })
      .map((item) => (
        <Card
          id={item.id}
          name={item.name}
          status={item.status}
          species={item.species}
          type={item.type}
          gender={item.gender}
          origin={item.origin}
          location={item.location}
          image={item.image}
          episode={item.episode}
          url={item.url}
          created={item.created}
          key={item.name}
        />
      ));

    return cards;
  }

  componentDidMount() {
    this.updateCardsValue();
  }

  componentDidUpdate(
    _: Readonly<Record<string, never>>,
    prevState: Readonly<{ searchQuery: string; cards: JSX.Element[] | null }>
  ) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.updateCardsValue();
    }
  }

  render() {
    return (
      <div className={styles['main-page']} data-testid={'main'}>
        <SearchField handleChange={this.handleChange} currentValue={this.state.searchQuery} />
        <div className={styles['cards-container']}>{this.state.cards}</div>
      </div>
    );
  }
}

export default MainPage;
