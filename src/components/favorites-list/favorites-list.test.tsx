import { Cities } from '@const';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeOffers, makeFakeState } from '../../mocks/mocks';
import MemoizedFavoritesList from './favorites-list';

describe('FavoritesList Component', () => {
  const testCity = Cities[0];
  const fakeOffers = makeFakeOffers(3).map((offer) => ({
    ...offer,
    city: testCity,
    isFavorite: true,
  }));

  const cities = [testCity.name];
  const initialState = makeFakeState();

  it('should render the correct number of cities', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);
    expect(screen.getByText(testCity.name)).toBeInTheDocument();
  });

  it('should render the correct number of favorite offers for each city', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);
    const cityFavorites = screen.getAllByRole('article');
    expect(cityFavorites.length).toBe(3);
  });

  it('should show no offers for a city with no favorites', () => {
    const emptyCity = Cities[1].name;
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={[emptyCity]} favorites={[]} />),
      initialState
    );

    render(withStoreComponent);
    const cityFavorites = screen.queryAllByRole('article');
    expect(cityFavorites.length).toBe(0);
  });

  it('should display the correct structure for city sections', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);

    const citySection = screen.getByText(testCity.name).closest('li');
    expect(citySection).toHaveClass('favorites__locations-items');
    expect(citySection?.querySelector('.favorites__places')).not.toBeNull();
  });

});
