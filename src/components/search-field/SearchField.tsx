import { useAppState } from 'context/AppContext';
import React from 'react';
import styles from './search-field.module.css';

interface SearchFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchField: React.FC<SearchFieldProps> = ({ handleChange }) => {
  const appState = useAppState();

  return (
    <input
      className={styles['input']}
      type="text"
      name="search"
      placeholder="Search"
      autoComplete="off"
      autoFocus={true}
      value={appState.searchFieldValue}
      onChange={handleChange}
    />
  );
};

export default SearchField;
