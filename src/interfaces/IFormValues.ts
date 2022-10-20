interface IFormValues {
  characterName: string;
  characterStatus: string;
  characterSpecies: string;
  characterGender: string;
  characterOrigin: string;
  characterLocation: string;
  characterDateOfCreation: string;
  characterAvatar: FileList | null;
  agreement: boolean;
}

export default IFormValues;
