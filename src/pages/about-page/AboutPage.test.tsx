import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it('should render AboutPage component', () => {
    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  it('should contain text on the page', () => {
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });
});
