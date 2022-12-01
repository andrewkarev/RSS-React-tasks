const getClassName = (status: string | undefined) => {
  if (status === 'Alive') return 'marker-alive';
  if (status === 'Dead') return 'marker-dead';

  return 'marker';
};

export default getClassName;
