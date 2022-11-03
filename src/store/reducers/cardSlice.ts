import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from 'interfaces/ICard';

interface CardState {
  selectedCard: ICard | null;
}

const initialState: CardState = {
  selectedCard: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSelectedCard(state, action: PayloadAction<ICard>) {
      state.selectedCard = action.payload;
    },
  },
});

export const { setSelectedCard } = cardSlice.actions;
export default cardSlice.reducer;
