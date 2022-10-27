import axios from 'axios';
import ISeries from 'interfaces/ISeries';

const getSeries = async (url: string) => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Something went wrong');
    }

    const data: ISeries = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export default getSeries;
