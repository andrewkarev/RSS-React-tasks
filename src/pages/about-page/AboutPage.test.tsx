import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('should render AboutPage component', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });
});
