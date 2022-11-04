import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render NotFoundPage component', () => {
    render(<NotFoundPage />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should contain page title', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('should contain clarifying text on the page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/find/i)).toBeInTheDocument();
    expect(screen.getByText(/Please contact/i)).toBeInTheDocument();
  });

  it('should contain image', () => {
    render(<NotFoundPage />);
    expect(screen.getByAltText(/Rick and Morty/i)).toBeInTheDocument();
  });
});
