import React, { SyntheticEvent } from 'react';
import { render, screen } from '@testing-library/react';
import SearchField from './SearchField';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
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
        "VM587:1 Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    }

    if (typeof index !== 'string' || index > this.storage.length) return null;

    return Object.keys(this.storage)[index];
  }
}

describe('SearchField', () => {
  const onChange = jest.fn((e: SyntheticEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
  });

  it('should be in focus after render', () => {
    render(<SearchField currentValue="" handleChange={onChange}></SearchField>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be in focus after render', () => {
    render(<SearchField currentValue="" handleChange={onChange}></SearchField>);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('calls the onChange callback handler', () => {
    render(<SearchField currentValue="" handleChange={onChange}></SearchField>);
    userEvent.type(screen.getByRole('textbox'), 'Morty');

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('should save input value into the localStorage on SearchField unmount', async () => {
    const mockedLocalStorage = new LocalStorageMock();

    Object.defineProperty(window, 'localStorage', {
      value: mockedLocalStorage,
    });

    render(<App />, { wrapper: BrowserRouter });

    const searchField = screen.getByRole('textbox');

    expect(searchField).not.toHaveValue('Search request');

    userEvent.type(searchField, 'Search request');
    await userEvent.click(screen.getByText(/about/i));
    await userEvent.click(screen.getByText(/home/i));

    expect(searchField).toHaveValue('Search request');
  });
});
