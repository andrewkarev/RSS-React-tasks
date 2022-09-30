import ISearchQuery from 'interfaces/ISearchQuery';
import React from 'react';
import styles from './search-field.module.css';

class SearchField extends React.Component<ISearchQuery> {
  constructor(props: ISearchQuery) {
    super(props);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
      </form>
    );
  }
}

export default SearchField;
