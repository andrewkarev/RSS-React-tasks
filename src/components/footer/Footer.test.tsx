import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render Footer component', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should contain date element', () => {
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });

  it('should contain quote element', () => {
    expect(screen.getByText(/science/i)).toBeInTheDocument();
  });
});
