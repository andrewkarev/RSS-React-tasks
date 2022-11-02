import AppState from 'interfaces/AppState';
import SortingOptions from './enums/sorting-options';

export const BASE_URL = 'https://rickandmortyapi.com/api';
export const CHARACTER_URL = BASE_URL + '/character/';

export const INITIAL_RESPONSE_LENGTH = 20;

export const INITIAL_STATE: AppState = {
  searchFieldValue: '',
  searchQuery: '',
  mainPageCards: [],
  selectedCard: null,
  pagesQuantity: '1',
  mainPageControlsValues: {
    pageNumber: '1',
    itemsOnPage: '20',
    sortingOrder: SortingOptions.DEFAULT,
  },
};
