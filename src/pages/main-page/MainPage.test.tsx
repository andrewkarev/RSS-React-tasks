import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from './MainPage';
import IStorage from 'interfaces/IStorage';

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

describe('MainPage', () => {
  const setSelectedCardValueMock = jest.fn();
  const toggleModalWindowMock = jest.fn();

  let searchField: HTMLInputElement;
  beforeEach(() => {
    render(
      <MainPage
        selectedCard={null}
        isModalOpened={false}
        setSelectedCardValue={setSelectedCardValueMock}
        toggleModalWindow={toggleModalWindowMock}
      />
    );
    searchField = screen.getByRole('textbox');
    userEvent.clear(searchField);
  });

  it('should render MainPage component', () => {
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('should contain search field', () => {
    expect(searchField).toBeInTheDocument();
  });

  it('should display correct value in the search field', () => {
    expect(searchField).not.toHaveValue('Search query');
    userEvent.type(searchField, 'Search query');
    expect(searchField).toHaveValue('Search query');
  });

  it('should save input value into the localStorage on SearchField unmount', () => {
    const mockedLocalStorage = new LocalStorageMock();
    Object.defineProperty(window, 'localStorage', {
      value: mockedLocalStorage,
    });
    expect(mockedLocalStorage.getItem('searchQuery')).toEqual(null);
    userEvent.type(searchField, 'Search');
    expect(mockedLocalStorage.getItem('searchQuery')).toEqual('Search');
  });
});
