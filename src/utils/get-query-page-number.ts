import { INITIAL_RESPONSE_LENGTH } from 'common/constants';

const getQueryPageNumber = (selectedPage: string, itemsOnPage: string) => {
  const chunksQuantity = INITIAL_RESPONSE_LENGTH / Number(itemsOnPage);
  return String(Math.ceil(Number(selectedPage) / chunksQuantity));
};

export default getQueryPageNumber;
