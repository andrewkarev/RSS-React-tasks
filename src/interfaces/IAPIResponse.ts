import ICard from './ICard';

interface IAPIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICard[];
}

export default IAPIResponse;
