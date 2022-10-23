const getDateOfCreation = (initialDate = '') => {
  const monthes = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateOfCreation = new Date(initialDate);
  const month = dateOfCreation.getMonth();
  const date = dateOfCreation.getDate();
  const year = dateOfCreation.getFullYear();

  return `${monthes[month]} ${date}, ${year}`;
};

export default getDateOfCreation;
