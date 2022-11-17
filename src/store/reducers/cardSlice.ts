import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from 'interfaces/ICard';
import getEpisode from 'services/get-episode-api';
import { RootState } from 'store/store';

export const fetchFirstAndLastEpisodes = createAsyncThunk(
  'card/fetchFirstEpisode',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const firstEpisodeLink = state.card.selectedCard?.episode?.at(0) || '';
    const lastEpisodeLink = state.card.selectedCard?.episode?.at(-1) || '';

    try {
      const firstEpisode = await getEpisode(firstEpisodeLink);
      const lastEpisode =
        firstEpisodeLink === lastEpisodeLink ? firstEpisode : await getEpisode(lastEpisodeLink);

      return { firstEpisode, lastEpisode };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CardState {
  selectedCard: ICard | null;
  isPending: boolean;
  firstEpisodeTitle: string;
  lastEpisodeTitle: string;
}

const initialState: CardState = {
  selectedCard: JSON.parse(localStorage.getItem('selectedCard') || ''),
  isPending: false,
  firstEpisodeTitle: localStorage.getItem('firstEpisodeTitle') || '',
  lastEpisodeTitle: localStorage.getItem('lastEpisodeTitle') || '',
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSelectedCard(state, action: PayloadAction<ICard>) {
      state.selectedCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFirstAndLastEpisodes.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(fetchFirstAndLastEpisodes.fulfilled, (state, action) => {
      const firstEpisode = action.payload.firstEpisode.name || '';
      const lastEpisode = action.payload.lastEpisode.name || '';

      state.isPending = false;
      state.firstEpisodeTitle = firstEpisode;
      state.lastEpisodeTitle = lastEpisode;

      localStorage.setItem('firstEpisodeTitle', firstEpisode);
      localStorage.setItem('lastEpisodeTitle', lastEpisode);
    });
  },
});

export const { setSelectedCard } = cardSlice.actions;
export default cardSlice.reducer;
