import AppActionKind from 'common/enums/app-action-kind';
import AppAction from 'interfaces/AppAction';
import AppState from 'interfaces/AppState';

const INITIAL_STATE: AppState = {
  searchFieldValue: '',
  searchQuery: '',
  formPageCards: [],
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

const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type, payload } = action;

  switch (type) {
    case AppActionKind.SET_FORM_FIELDS_VALUES: {
      return { ...state };
    }
    case AppActionKind.SET_FORM_PAGE_CARDS: {
      const newCard = payload.formPageCards ? [...payload.formPageCards] : [];
      return { ...state, formPageCards: [...state.formPageCards, ...newCard] };
    }
    case AppActionKind.SET_SEARCH_FIELD_VALUE: {
      return { ...state, searchFieldValue: payload.searchFieldValue || '' };
    }
    case AppActionKind.SET_SEARCH_QUERY: {
      return { ...state, searchQuery: payload.searchQuery || '' };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export { appReducer, INITIAL_STATE };
