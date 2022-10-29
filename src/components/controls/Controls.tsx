import React, { useEffect } from 'react';
import styles from './controls.module.css';
import ControlsPageCounter from 'components/controls-page-counter/';
import { useAppDispatch, useAppState } from 'context/AppContext';
import AppActionKind from 'common/enums/app-action-kind';
import { useForm } from 'react-hook-form';
import IControlsInputs from 'interfaces/IControlsInpust';
import SearchField from 'components/search-field';
import SortingOptions from 'common/enums/sorting-options';

export const Controls: React.FC = () => {
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  const { register, setValue, getValues } = useForm<IControlsInputs>();

  const onChange = () => {
    const data = getValues();

    appDispatch({
      type: AppActionKind.GET_CONTROLS_VALUES,
      payload: { mainPageControlsValues: data },
    });
  };

  useEffect(() => {
    setValue('pageNumber', appState.mainPageControlsValues.pageNumber);
    setValue('itemsOnPage', appState.mainPageControlsValues.itemsOnPage);
    setValue('sortingOrder', appState.mainPageControlsValues.sortingOrder);
  }, [
    appState.mainPageControlsValues.itemsOnPage,
    appState.mainPageControlsValues.pageNumber,
    appState.mainPageControlsValues.sortingOrder,
    setValue,
  ]);

  return (
    <>
      <form className={styles['controls']} onChange={onChange}>
        <div className={styles['controls-element']}>
          <div className={styles['pages']}>
            <label className={styles['page-label']} htmlFor="input-page">
              Page
            </label>
            <input
              {...register('pageNumber')}
              className={styles['input-page']}
              id="input-page"
              type="number"
              autoComplete="off"
              min={1}
              max={appState.pagesQuantity}
            />
            <p className={styles['page-preposition']}>of</p>
            <div className={styles['pages-at-all']}>{appState.pagesQuantity}</div>
          </div>
          <div className={styles['vertical-line']}></div>
          <div className={styles['cards-on-page']}>
            <div className={styles['cards-on-page-title']}>Cards on page:</div>
            <ControlsPageCounter register={register} quantity={'20'} />
            <ControlsPageCounter register={register} quantity={'10'} />
            <ControlsPageCounter register={register} quantity={'5'} />
          </div>
          <div className={styles['vertical-line']}></div>
          <div className={styles['sorting']}>
            <label className={styles['sorting-label']} htmlFor="sorting-options">
              Sort by:
            </label>
            <select
              {...register('sortingOrder')}
              id="sorting-options"
              className={`${styles['sorting-options']}`}
            >
              <option value={SortingOptions.NAME_ASCENDING}>Name A-Z</option>
              <option value={SortingOptions.NAME_DESCENDING}>Name Z-A</option>
              <option value={SortingOptions.DEFAULT}>Default</option>
            </select>
          </div>
        </div>
      </form>

      <div className={styles['controls-element']}>
        <SearchField />
      </div>
    </>
  );
};

export default Controls;
