import Card from 'components/card/Card';
import React from 'react';
import styles from './main-page.module.css';
import cardsData from 'data/cards-data';
import SearchField from 'components/search-field/SearchField';

class MainPage extends React.Component<Record<string, never>, { searchQuery: string }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { searchQuery: localStorage.getItem('searchQuery') || '' };
    this.handleChange = this.handleChange.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
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

  render() {
    return (
      <div className={styles['main-page']}>
        <SearchField handleChange={this.handleChange} currentValue={this.state.searchQuery} />
        <div className={styles['cards-container']}>{this.renderCards()}</div>
      </div>
    );
  }
}

export default MainPage;
