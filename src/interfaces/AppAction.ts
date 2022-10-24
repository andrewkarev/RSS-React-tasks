import AppActionKind from 'common/enums/app-action-kind';
import AppState from './AppState';

interface AppAction {
  type: AppActionKind;
  payload: Partial<AppState>;
}

export default AppAction;
