import AppState from 'interfaces/AppState';

export const BASE_URL = 'https://rickandmortyapi.com/api';
export const CHARACTER_URL = BASE_URL + '/character/?name=';

export const INITIAL_STATE: AppState = {
  searchFieldValue: '',
  searchQuery: '',
  formPageCards: [],
  isFormSubmitButtonDisabled: true,
  formHasErrors: false,
  formFieldsValues: {
    characterName: '',
    characterStatus: 'Alive',
    characterSpecies: 'Human',
    characterGender: '',
    characterOrigin: '',
    characterLocation: '',
    characterDateOfCreation: '',
    characterAvatar: null,
    agreement: false,
  },
};
