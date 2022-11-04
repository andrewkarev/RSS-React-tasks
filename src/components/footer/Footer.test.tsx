import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render Footer component', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should contain date element', () => {
    render(<Footer />);
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });

  it('should contain quote element', () => {
    render(<Footer />);
    expect(screen.getByText(/science/i)).toBeInTheDocument();
  });
});
