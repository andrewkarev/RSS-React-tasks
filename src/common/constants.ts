import AppState from 'interfaces/AppState';

export const BASE_URL = 'https://rickandmortyapi.com/api';
export const CHARACTER_URL = BASE_URL + '/character/';

export const INITIAL_RESPONSE_LENGTH = 20;

export const INITIAL_STATE: AppState = {
  selectedCard: null,
};
