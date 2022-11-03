import axios from 'axios';
import ISeries from 'interfaces/ISeries';

const getEpisode = async (url: string) => {
  const response = await axios.get(url);
  const data: ISeries = response.data;

  return data;
};

export default getEpisode;
