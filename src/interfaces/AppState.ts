import ICard from './ICard';
import IControlsInputs from './IControlsInpust';

interface AppState {
  mainPageCards: ICard[];
  searchQuery: string;
  searchFieldValue: string;
  mainPageControlsValues: IControlsInputs;
  pagesQuantity: string;
  selectedCard: ICard | null;
}

export default AppState;
