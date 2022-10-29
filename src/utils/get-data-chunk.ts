import { INITIAL_RESPONSE_LENGTH } from 'common/constants';
import ICard from 'interfaces/ICard';

const getDataChunk = (data: ICard[], selectedPage: string, itemsOnPage: string) => {
  const itemsQuantity = Number(itemsOnPage);
  const chunksQuantity = INITIAL_RESPONSE_LENGTH / itemsQuantity;
  const remainder = Number(selectedPage) % chunksQuantity;

  const end = remainder === 0 ? INITIAL_RESPONSE_LENGTH : remainder * itemsQuantity;
  const start = end - itemsQuantity;

  return data.slice(start, end);
};

export default getDataChunk;
