import AppActionKind from 'common/enums/app-action-kind';
import { useAppDispatch, useAppState } from 'context/AppContext';
import React from 'react';
import styles from './search-field.module.css';

const SearchField: React.FC = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldValue = e.target.value;

    appDispatch({
      type: AppActionKind.SET_SEARCH_FIELD_VALUE,
      payload: { searchFieldValue: searchFieldValue },
    });
  };

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
