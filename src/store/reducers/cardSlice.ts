import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from 'interfaces/ICard';
import getEpisode from 'services/get-episode-api';
import { RootState } from 'store/store';

export const fetchFirstEpisode = createAsyncThunk(
  'card/fetchFirstEpisode',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const firstEpisodeLink = state.card.selectedCard?.episode?.at(0) || '';

    try {
      return await getEpisode(firstEpisodeLink);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLastEpisode = createAsyncThunk(
  'card/fetchLastEpisode',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const lastEpisodeLink = state.card.selectedCard?.episode?.at(-1) || '';

    try {
      return await getEpisode(lastEpisodeLink);
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
  selectedCard: null,
  isPending: false,
  firstEpisodeTitle: '',
  lastEpisodeTitle: '',
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
    builder.addCase(fetchFirstEpisode.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(fetchFirstEpisode.fulfilled, (state, action) => {
      state.isPending = false;
      state.firstEpisodeTitle = action.payload.name || '';
    });
    builder.addCase(fetchLastEpisode.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(fetchLastEpisode.fulfilled, (state, action) => {
      state.isPending = false;
      state.lastEpisodeTitle = action.payload.name || '';
    });
  },
});

export const { setSelectedCard } = cardSlice.actions;
export default cardSlice.reducer;
