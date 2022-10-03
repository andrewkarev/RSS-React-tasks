interface ISearchQuery {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string;
}

export default ISearchQuery;
