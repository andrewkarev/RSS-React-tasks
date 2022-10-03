import ISearchQuery from 'interfaces/ISearchQuery';
import React from 'react';
import styles from './search-field.module.css';

class SearchField extends React.Component<ISearchQuery> {
  constructor(props: ISearchQuery) {
    super(props);
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', this.props.currentValue);
  }

  render() {
    return (
      <input
        className={styles.input}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        autoFocus={true}
        value={this.props.currentValue}
        onChange={this.props.handleChange}
      />
    );
  }
}

export default SearchField;
