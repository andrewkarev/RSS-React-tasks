import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from 'interfaces/ICard';

interface DetailsState {
  selectedCard: ICard | null;
}

const initialState: DetailsState = {
  selectedCard: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setSelectedCard(state, action: PayloadAction<ICard>) {
      state.selectedCard = action.payload;
    },
  },
});

export const { setSelectedCard } = detailsSlice.actions;
export default detailsSlice.reducer;
