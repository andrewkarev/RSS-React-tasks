import React from 'react';
import styles from './search-field.module.css';

interface SearchQuery {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string;
}

class SearchField extends React.Component<SearchQuery> {
  constructor(props: SearchQuery) {
    super(props);
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', this.props.currentValue);
  }

  render() {
    return (
      <input
        className={styles['input']}
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
