import ICard from './ICard';
import IFormValues from './IFormValues';

interface AppState {
  formPageCards: ICard[];
  searchFieldValue: string;
  searchQuery: string;
  isFormSubmitButtonDisabled: boolean;
  formHasErrors: boolean;
  formFieldsValues: IFormValues;
}

export default AppState;
