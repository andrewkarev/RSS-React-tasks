import { SyntheticEvent } from 'react';

interface ISearchQuery {
  handleChange: (e: SyntheticEvent) => void;
  currentValue: string;
}

export default ISearchQuery;
