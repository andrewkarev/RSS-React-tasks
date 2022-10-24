import ICard from './ICard';

interface AppState {
  formPageCards: ICard[];
  searchFieldValue: string;
  searchQuery: string;
  formFieldsValues: {
    characterName: string;
    characterStatus: string;
    characterSpecies: string;
    characterGender: string;
    characterOrigin: string;
    characterLocation: string;
    characterDateOfCreation: string;
    characterAvatar: null | string;
    agreement: boolean;
  };
}

export default AppState;
