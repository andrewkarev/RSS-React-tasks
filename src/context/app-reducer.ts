import { INITIAL_STATE } from 'common/constants';
import AppActionKind from 'common/enums/app-action-kind';
import AppAction from 'interfaces/AppAction';
import AppState from 'interfaces/AppState';

const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type, payload } = action;

  switch (type) {
    case AppActionKind.GET_FORM_FIELDS_VALUES: {
      return {
        ...state,
        formFieldsValues: payload.formFieldsValues || INITIAL_STATE.formFieldsValues,
      };
    }
    case AppActionKind.SET_FORM_PAGE_CARDS: {
      const newCard = payload.formPageCards ? [...payload.formPageCards] : [];
      return { ...state, formPageCards: [...state.formPageCards, ...newCard] };
    }
    case AppActionKind.SET_MAIN_PAGE_CARDS: {
      return { ...state, mainPageCards: [...(payload.mainPageCards || [])] };
    }
    case AppActionKind.SET_SELECTED_CARD: {
      return { ...state, selectedCard: { ...(payload.selectedCard || {}) } };
    }
    case AppActionKind.SET_SEARCH_FIELD_VALUE: {
      return { ...state, searchFieldValue: payload.searchFieldValue || '' };
    }
    case AppActionKind.SET_SEARCH_QUERY: {
      return { ...state, searchQuery: payload.searchQuery || '' };
    }
    case AppActionKind.SET_IS_SUBMIT_BUTTON_DISABLED: {
      return { ...state, isFormSubmitButtonDisabled: !!payload.isFormSubmitButtonDisabled };
    }
    case AppActionKind.SET_FORM_HAS_ERRORS: {
      return { ...state, formHasErrors: !!payload.formHasErrors };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export { appReducer };
