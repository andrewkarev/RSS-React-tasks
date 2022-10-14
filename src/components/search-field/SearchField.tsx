import React, { SyntheticEvent } from 'react';
import styles from './search-field.module.css';

interface SearchFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  currentValue: string;
}

class SearchField extends React.Component<SearchFieldProps> {
  constructor(props: SearchFieldProps) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
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
      </form>
    );
  }
}

export default SearchField;
