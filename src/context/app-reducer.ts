import AppActionKind from 'common/enums/app-action-kind';
import AppAction from 'interfaces/AppAction';
import AppState from 'interfaces/AppState';

const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type, payload } = action;

  switch (type) {
    case AppActionKind.SET_SELECTED_CARD: {
      return { ...state, selectedCard: { ...(payload.selectedCard || {}) } };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export { appReducer };
