import ICard from './ICard';
import IControlsInputs from './IControlsInpust';
import IFormValues from './IFormValues';

interface AppState {
  formPageCards: ICard[];
  mainPageCards: ICard[];
  selectedCard: ICard | null;
  searchFieldValue: string;
  searchQuery: string;
  isFormSubmitButtonDisabled: boolean;
  formHasErrors: boolean;
  formFieldsValues: IFormValues;
  mainPageControlsValues: IControlsInputs;
  pagesQuantity: string;
}

export default AppState;
