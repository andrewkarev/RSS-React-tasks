import axios from 'axios';
import { CHARACTER_URL } from 'common/constants';
import ICharacterResponse from 'interfaces/ICharactersResponse';

const getCharacters = async (searchQuery: string, page: string) => {
  try {
    const url = `${CHARACTER_URL}?page=${page}&name=${searchQuery}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Something went wrong');
    }

    const data: ICharacterResponse = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export default getCharacters;
