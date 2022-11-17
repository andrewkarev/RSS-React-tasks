import { INITIAL_STATE } from 'common/constants';
import AppAction from 'interfaces/AppAction';
import AppState from 'interfaces/AppState';
import React from 'react';
import { appReducer } from './app-reducer';

type Dispatch = ({ type, payload }: AppAction) => void;
type AppProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, INITIAL_STATE);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);

  if (!context) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch };
