import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '.';

describe('Header', () => {
  it('should render Header component', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should contain navigation links', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('should navigate to the correct page', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const aboutLink = screen.getByText(/about/i);

    userEvent.click(aboutLink);
    expect(aboutLink).toHaveClass('link-active');
  });

  it('should navigate to the page with form', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const formLink = screen.getByText('Create');

    userEvent.click(formLink);
    expect(formLink).toHaveClass('link-active');
  });

  it('should navigate to the 404 page for bad address', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).not.toHaveClass('link-active');
    expect(screen.getByText(/About/i)).not.toHaveClass('link-active');
    expect(screen.getByText('Create')).not.toHaveClass('link-active');
  });
});
