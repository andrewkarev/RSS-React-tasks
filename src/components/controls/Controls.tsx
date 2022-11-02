import React, { useEffect } from 'react';
import styles from './controls.module.css';
import ControlsPageCounter from 'components/controls-page-counter/';
import { useForm } from 'react-hook-form';
import IControlsInputs from 'interfaces/IControlsInpust';
import SearchField from 'components/search-field';
import SortingOptions from 'common/enums/sorting-options';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setitemsOnPage, setSortingOrder, setPageNumber } from 'store/reducers/mainSlice';

export const Controls: React.FC = () => {
  const dispatch = useAppDispatch();
  const pageNumber = useAppSelector((state) => state.main.pageNumber);
  const itemsOnPage = useAppSelector((state) => state.main.itemsOnPage);
  const sortingOrder = useAppSelector((state) => state.main.sortingOrder);
  const pagesQuantity = useAppSelector((state) => state.main.pagesQuantity);

  const { register, setValue, getValues } = useForm<IControlsInputs>();

  const onChange = () => {
    const data = getValues();
    dispatch(setitemsOnPage(data.itemsOnPage));
    dispatch(setSortingOrder(data.sortingOrder));
    dispatch(setPageNumber(data.pageNumber));
  };

  useEffect(() => {
    setValue('pageNumber', pageNumber);
  }, [pageNumber, setValue]);

  useEffect(() => {
    dispatch(setPageNumber('1'));
    setValue('itemsOnPage', itemsOnPage);
    setValue('pageNumber', '1');
  }, [dispatch, setValue, itemsOnPage]);

  useEffect(() => {
    setValue('sortingOrder', sortingOrder);
  }, [sortingOrder, setValue]);

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
              max={pagesQuantity}
            />
            <p className={styles['page-preposition']}>of</p>
            <div className={styles['pages-at-all']}>{pagesQuantity}</div>
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
