import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SortingOptions from 'common/enums/sorting-options';
import ICard from 'interfaces/ICard';

interface MainState {
  cards: ICard[];
  searchQuery: string;
  searchFieldValue: string;
  pageNumber: string;
  itemsOnPage: string;
  sortingOrder: SortingOptions;
  pagesQuantity: string;
}

const initialState: MainState = {
  searchFieldValue: '',
  searchQuery: '',
  cards: [],
  pagesQuantity: '1',
  pageNumber: '1',
  itemsOnPage: '20',
  sortingOrder: SortingOptions.DEFAULT,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
    setPagesQuantiy(state, action: PayloadAction<string>) {
      state.pagesQuantity = action.payload;
    },
    setitemsOnPage(state, action: PayloadAction<string>) {
      state.itemsOnPage = action.payload;
    },
    setSortingOrder(state, action: PayloadAction<SortingOptions>) {
      state.sortingOrder = action.payload;
    },
    setPageNumber(state, action: PayloadAction<string>) {
      state.pageNumber = action.payload;
    },
    setSearchFieldValue(state, action: PayloadAction<string>) {
      state.searchFieldValue = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setSearchFieldValue,
  setSearchQuery,
  addCards,
  setPageNumber,
  setPagesQuantiy,
  setSortingOrder,
  setitemsOnPage,
} = mainSlice.actions;
export default mainSlice.reducer;
