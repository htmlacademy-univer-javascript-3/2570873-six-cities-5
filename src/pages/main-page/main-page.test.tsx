import { Cities, SortOptions } from '@const';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeOffers, makeFakeState } from '../../mocks/mocks';
import MainPage from './main-page';

describe('Component: MainScreen', () => {
  it('renders main page with offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      makeFakeState()
    );

    const { container } = render(withStoreComponent);

    const header = container.querySelector('.header');
    const main = container.querySelector('.page__main--index');

    expect(header).not.toBeNull();
    expect(main).not.toBeNull();
  });

  it('filters offers by selected city', () => {
    const mockOffers = makeFakeOffers().map((offer) => ({
      ...offer,
      city: { ...offer.city, name: Cities[0].name }
    }));

    const { withStoreComponent } = withStore(
      withHistory(<MainPage />),
      makeFakeState({
        APP: {
          city: Cities[0],
          SortOptions: SortOptions.Popular,
          error: null
        },
        OFFERS: {
          offers: mockOffers,
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);
    const placesList = container.querySelector('.cities__places-list');

    expect(placesList).not.toBeNull();
  });
});
