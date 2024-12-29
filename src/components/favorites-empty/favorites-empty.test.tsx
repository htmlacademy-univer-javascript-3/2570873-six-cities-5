import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('FavoritesEmpty', () => {
  it('renders the correct message when there are no favorites', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('renders the correct heading for empty favorites page', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByRole('heading', { name: /Favorites \(empty\)/i })).toBeInTheDocument();
  });
});
