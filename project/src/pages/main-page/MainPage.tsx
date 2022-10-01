import Card from 'components/card/Card';
import React from 'react';
import styles from './main-page.module.css';
import cardsData from 'data/cards-data';
import SearchField from 'components/search-field/SearchField';
import ISearchQuery from 'interfaces/ISearchQuery';

class MainPage extends React.Component<ISearchQuery> {
  constructor(props: ISearchQuery) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    const cards = cardsData
      .filter((card) => {
        const validValue = this.props.currentValue.toLowerCase();
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
        <SearchField
          handleChange={this.props.handleChange}
          currentValue={this.props.currentValue}
        />
        <div className={styles['cards-container']}>{this.renderCards()}</div>
      </div>
    );
  }
}

export default MainPage;
