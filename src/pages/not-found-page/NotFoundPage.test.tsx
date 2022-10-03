import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render NotFoundPage component', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
