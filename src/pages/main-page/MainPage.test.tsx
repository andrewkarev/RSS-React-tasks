import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IStorage from 'interfaces/IStorage';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import cardsData from 'data/cards-data';
import ICard from 'interfaces/ICard';
import { CHARACTER_URL } from 'common/constants';

class LocalStorageMock implements IStorage {
  storage: {
    [key: string]: string;
  };
  length: number;

  constructor() {
    this.storage = {};
    this.length = 0;
  }

  setItem(key: string, value: string) {
    this.storage[key] = value;
    this.length++;
  }

  getItem(key: string) {
    return this.storage[key] || null;
  }

  removeItem(key: string) {
    if (this.storage[key]) {
      delete this.storage[key];
    }
    this.length--;
  }

  clear() {
    this.storage = {};
    this.length = 0;
  }

  key(index: number) {
    if (!index) {
      throw new Error(
        "Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    }

    if (typeof index !== 'string' || index > this.storage.length) return null;

    return Object.keys(this.storage)[index];
  }
}

const characters: ICard[] = cardsData;

const server = setupServer(
  rest.get(CHARACTER_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: characters,
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('MainPage', () => {
  it('should render MainPage component', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('should contain search field', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display correct value in the search field', () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole('textbox')).not.toHaveValue('Search query');
    userEvent.type(screen.getByRole('textbox'), 'Search query');
    expect(screen.getByRole('textbox')).toHaveValue('Search query');
  });

  it('should save input value into the localStorage on SearchField unmount', () => {
    const mockedLocalStorage = new LocalStorageMock();
    Object.defineProperty(window, 'localStorage', {
      value: mockedLocalStorage,
    });

    render(<App />, { wrapper: BrowserRouter });
    expect(mockedLocalStorage.getItem('searchQuery')).toEqual(null);
    userEvent.type(screen.getByRole('textbox'), 'Search');
    expect(mockedLocalStorage.getItem('searchQuery')).toEqual('Search');
    mockedLocalStorage.clear();
  });

  it('should fetch data and display cards', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toEqual(cardsData.length);
  });

  it('should handle failed request', async () => {
    server.use(
      rest.get(CHARACTER_URL, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const errorMessage = 'There is no hero with that name';

    render(<App />, { wrapper: BrowserRouter });

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should open modal window on card click', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    userEvent.click(card);
    expect(screen.queryByTestId('pop-up')).toBeInTheDocument();
  });
});
