import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './footer';


describe('Component: Footer', () => {
  it('renders correctly', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('contains the logo with correct attributes', () => {
    render(<Footer />);

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
  });

});
