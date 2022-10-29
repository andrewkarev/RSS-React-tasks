import axios, { AxiosResponse } from 'axios';
import { CHARACTER_URL } from 'common/constants';
import cardsData from 'data/cards-data';
import ICard from 'interfaces/ICard';
import getCharacters from './get-characters-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getCharacters', () => {
  it('should return characters list', async () => {
    const characters: ICard[] = cardsData;
    const defaultSearchQuery = '';

    const mockedResponse: AxiosResponse = {
      data: {
        results: characters,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(axios.get).not.toHaveBeenCalled();
    const data = await getCharacters(defaultSearchQuery, '');
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(characters);
  });

  it('should be called with appropriate URL', async () => {
    const characters: ICard[] = cardsData;
    const defaultSearchQuery = 'test';

    const mockedResponse: AxiosResponse = {
      data: {
        results: characters,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(axios.get).not.toHaveBeenCalled();
    await getCharacters(defaultSearchQuery, '');
    expect(axios.get).toHaveBeenCalledWith(CHARACTER_URL + defaultSearchQuery);
  });

  it('should throw an reeor', async () => {
    const characters: ICard[] = cardsData;
    const defaultSearchQuery = 'not valid';

    const mockedResponse: AxiosResponse = {
      data: {
        results: characters,
      },
      status: 404,
      statusText: 'error',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    await expect(getCharacters(defaultSearchQuery, '')).rejects.toThrow('Something went wrong');
  });
});
