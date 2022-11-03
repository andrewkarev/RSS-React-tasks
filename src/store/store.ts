import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './reducers/cardSlice';
import formSlice from './reducers/formSlice';
import mainSlice from './reducers/mainSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
    main: mainSlice,
    card: cardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
