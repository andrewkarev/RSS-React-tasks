import React, { SyntheticEvent } from 'react';
import styles from './search-field.module.css';

interface SearchFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  currentValue: string;
}
const SearchField: React.FC<SearchFieldProps> = ({ handleChange, handleSubmit, currentValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles['input']}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        autoFocus
        value={currentValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchField;
