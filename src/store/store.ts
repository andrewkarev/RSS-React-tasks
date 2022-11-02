import { configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
