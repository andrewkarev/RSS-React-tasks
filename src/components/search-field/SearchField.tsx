import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useCallback, useEffect } from 'react';
import { fetchCharacters, setPageNumber, setSearchFieldValue } from 'store/reducers/mainSlice';
import styles from './search-field.module.css';

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchFieldValue = useAppSelector((state) => state.main.searchFieldValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldValue = e.target.value;

    dispatch(setSearchFieldValue(searchFieldValue));
  };

  const handleClick = useCallback(() => {
    dispatch(setPageNumber('1'));

    dispatch(fetchCharacters());
  }, [dispatch]);

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
        value={searchFieldValue}
        onChange={handleChange}
      />
      <button className={styles['submit-btn']} type="button" onClick={handleClick}>
        Find
      </button>
    </>
  );
};

export default SearchField;
