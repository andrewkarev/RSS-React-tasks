import React, { SyntheticEvent } from 'react';
import SearchField from 'components/search-field';
import styles from './controls.module.css';
import ControlsPageCounter from 'components/controls-page-counter/ControlsPageCounter';
import { useAppDispatch, useAppState } from 'context/AppContext';
import AppActionKind from 'common/enums/app-action-kind';

export const Controls: React.FC = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    appDispatch({
      type: AppActionKind.SET_SEARCH_QUERY,
      payload: { searchQuery: appState.searchFieldValue },
    });
  };

  return (
    <form className={styles['controls']} onSubmit={handleSubmit}>
      <div className={styles['controls-element']}>
        <div className={styles['pages']}>
          <label className={styles['page-label']} htmlFor="input-page">
            Page
          </label>
          <input
            className={styles['input-page']}
            id="input-page"
            type="number"
            name="page"
            autoComplete="off"
            min={1}
            // max={}
          />
          <p className={styles['page-preposition']}>of</p>
          <div className={styles['pages-at-all']}>847</div>
        </div>
        <div className={styles['cards-on-page']}>
          <div className={styles['cards-on-page-title']}>Cards on page:</div>
          <ControlsPageCounter quantity={'20'} />
          <ControlsPageCounter quantity={'15'} />
          <ControlsPageCounter quantity={'10'} />
          <ControlsPageCounter quantity={'5'} />
        </div>
        <div className={styles['sorting']}>
          <label className={styles['sorting-label']} htmlFor="sorting-options">
            Sort by:
          </label>
          <select id="sorting-options" className={`${styles['sorting-options']}`}>
            <option value="Name ascending">Name A-Z</option>
            <option value="Name descending">Name Z-A</option>
            <option value="default">Default</option>
          </select>
        </div>
      </div>
      <div className={styles['controls-element']}>
        <SearchField />
        <button className={styles['submit-btn']} type="submit" data-testid={'submit-btn'}>
          Find
        </button>
      </div>
    </form>
  );
};

export default Controls;
