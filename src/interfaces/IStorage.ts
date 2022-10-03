interface IStorage {
  storage: {
    [key: string]: string;
  };
  length: number;
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  clear: () => void;
  key: (index: number) => string | null | never;
}

export default IStorage;
