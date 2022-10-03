import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from 'App';

describe('Header', () => {
  it('should render Header component', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should contain navigation links', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it('should navigate to the correct page', () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });

  it('should navigate to the 404 page for bad address', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
