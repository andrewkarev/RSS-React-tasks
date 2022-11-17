import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CHARACTER_URL } from 'common/constants';
import SortingOptions from 'common/enums/sorting-options';
import ICard from 'interfaces/ICard';
import ICharacterResponse from 'interfaces/ICharactersResponse';
import { RootState } from 'store/store';
import getDataChunk from 'utils/get-data-chunk';
import getQueryPageNumber from 'utils/get-query-page-number';
import sort from 'utils/sort';

export const fetchCharacters = createAsyncThunk(
  'main/fetchCharacters',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const page = getQueryPageNumber(state.main.pageNumber, state.main.itemsOnPage);

    try {
      const url = `${CHARACTER_URL}?page=${page}&name=${state.main.searchFieldValue}`;
      const response = await axios.get(url);
      const data: ICharacterResponse = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
interface MainState {
  cards: ICard[];
  searchFieldValue: string;
  pageNumber: string;
  itemsOnPage: string;
  sortingOrder: SortingOptions;
  pagesQuantity: string;
  isPending: boolean;
  isErrorOccured: boolean;
}

const initialState: MainState = {
  searchFieldValue: '',
  cards: [],
  pagesQuantity: '1',
  pageNumber: localStorage.getItem('pageNumber') || '1',
  itemsOnPage: '20',
  sortingOrder: SortingOptions.DEFAULT,

  isPending: false,
  isErrorOccured: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.cards = [];
      state.isPending = true;
      state.isErrorOccured = false;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      const pagesAtAll = String(Math.ceil(action.payload.info.count / Number(state.itemsOnPage)));
      const sortedData = sort(action.payload.results, state.sortingOrder);
      const data = getDataChunk(sortedData, state.pageNumber, state.itemsOnPage);

      state.isPending = false;
      state.isErrorOccured = false;
      state.pagesQuantity = pagesAtAll;
      state.cards = data;
    });
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.isPending = false;
      state.isErrorOccured = true;
    });
  },
});

export const {
  setSearchFieldValue,
  setPageNumber,
  setPagesQuantiy,
  setSortingOrder,
  setitemsOnPage,
} = mainSlice.actions;
export default mainSlice.reducer;
