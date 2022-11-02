import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ICard from 'interfaces/ICard';
import IFormValues from 'interfaces/IFormValues';

interface FormState {
  cards: ICard[];
  isSubmitButtonDisabled: boolean;
  errors: boolean;
  fieldsValues: IFormValues;
}

export const initialState: FormState = {
  cards: [],
  isSubmitButtonDisabled: true,
  errors: false,
  fieldsValues: {
    characterName: '',
    characterStatus: 'Alive',
    characterSpecies: 'Human',
    characterGender: '',
    characterOrigin: '',
    characterLocation: '',
    characterDateOfCreation: '',
    characterAvatar: null,
    agreement: false,
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getFormFieldsValues(state, action: PayloadAction<IFormValues>) {
      state.fieldsValues = action.payload;
    },
    setIsSubmitButtonDisabled(state, action: PayloadAction<boolean>) {
      state.isSubmitButtonDisabled = action.payload;
    },
    setErrors(state, action: PayloadAction<boolean>) {
      state.errors = action.payload;
    },
    addCards(state, action: PayloadAction<ICard>) {
      state.cards.push(action.payload);
    },
  },
});

export const { getFormFieldsValues, setIsSubmitButtonDisabled, setErrors, addCards } =
  formSlice.actions;
export default formSlice.reducer;
