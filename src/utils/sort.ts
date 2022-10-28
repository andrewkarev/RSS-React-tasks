import SortingOptions from 'common/enums/sorting-options';
import ICard from 'interfaces/ICard';

const sort = (array: ICard[], sortingOption: SortingOptions) => {
  const arrayCopy = [...array];

  switch (sortingOption) {
    case SortingOptions.NAME_ASCENDING: {
      arrayCopy.sort((a, b) => {
        const nameA: string = a.name?.toLowerCase() || '';
        const nameB: string = b.name?.toLowerCase() || '';

        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      });
      return arrayCopy;
    }
    case SortingOptions.NAME_DESCENDING: {
      arrayCopy.sort((a, b) => {
        const nameA: string = a.name?.toLowerCase() || '';
        const nameB: string = b.name?.toLowerCase() || '';

        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
      return arrayCopy;
    }
    default: {
      return array;
    }
  }
};

export default sort;
