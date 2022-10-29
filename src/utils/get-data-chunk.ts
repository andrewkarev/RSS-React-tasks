import { INITIAL_RESPONSE_LENGTH } from 'common/constants';
import ICard from 'interfaces/ICard';

const getDataChunk = (data: ICard[], selectedPage: string, itemsOnPage: string) => {
  const itemsQuantity = Number(itemsOnPage);
  const chunksQuantity = INITIAL_RESPONSE_LENGTH / itemsQuantity;
  let finishIndexMultiplier = 1;

  for (let i = chunksQuantity; i > 0; i--) {
    if (Number(selectedPage) % i === 0) {
      finishIndexMultiplier = i;
      break;
    }
  }

  const end = finishIndexMultiplier * itemsQuantity;
  const start = end - itemsQuantity;

  return data.slice(start, end);
};

export default getDataChunk;
