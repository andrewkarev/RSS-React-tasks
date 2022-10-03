import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render Footer component', () => {
    render(<Footer />);
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });
});
