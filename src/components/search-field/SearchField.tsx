import AppActionKind from 'common/enums/app-action-kind';
import { useAppDispatch, useAppState } from 'context/AppContext';
import React, { useCallback, useEffect } from 'react';
import styles from './search-field.module.css';

const SearchField: React.FC = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldValue = e.target.value;

    appDispatch({
      type: AppActionKind.SET_SEARCH_FIELD_VALUE,
      payload: { searchFieldValue },
    });
  };

  const handleClick = useCallback(() => {
    appDispatch({
      type: AppActionKind.SET_SEARCH_QUERY,
      payload: { searchQuery: appState.searchFieldValue },
    });
  }, [appDispatch, appState.searchFieldValue]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code.match(/Enter/)) {
        e.preventDefault();
        handleClick();
      }
    };

    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [handleClick]);

  return (
    <>
      <input
        className={styles['input']}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        autoFocus
        value={appState.searchFieldValue}
        onChange={handleChange}
      />
      <button className={styles['submit-btn']} type="button" onClick={handleClick}>
        Find
      </button>
    </>
  );
};

export default SearchField;
