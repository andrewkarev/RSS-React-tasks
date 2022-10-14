import axios from 'axios';
import { CHARACTER_URL } from 'common/constants';
import ICard from 'interfaces/ICard';

const getCharacters = async (searchQuery: string) => {
  try {
    const url = CHARACTER_URL + searchQuery;
    const response = await axios.get(url);
    const data: ICard[] = response.data.results;

    return data;
  } catch (error) {
    throw error;
  }
};

export default getCharacters;
