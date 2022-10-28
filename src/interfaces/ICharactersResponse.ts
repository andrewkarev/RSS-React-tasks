import ICard from './ICard';

interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: ICard[];
}

export default ICharacterResponse;
