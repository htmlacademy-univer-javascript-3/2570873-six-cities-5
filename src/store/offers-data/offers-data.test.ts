import { mockOffers } from '@mocks/mocks';
import { describe, expect, it } from 'vitest';
import { loadOffers, offersData, setOffersDataLoadingStatus, updateFavorites } from './offers-data';

const initialState = {
  offers: [],
  isOffersDataLoading: false,
  favoritesCount: 0,
};

describe('Reducer: offersData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = offersData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should load offers when loadOffers action is dispatched', () => {
    const action = loadOffers(mockOffers);
    const result = offersData.reducer(initialState, action);
    expect(result.offers).toEqual(mockOffers);
  });

  it('should update loading status when setOffersDataLoadingStatus action is dispatched', () => {
    const action = setOffersDataLoadingStatus(true);
    const result = offersData.reducer(initialState, action);
    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should update favorites and recalculate favoritesCount when updateFavorites action is dispatched', () => {
    const stateWithOffers = {
      ...initialState,
      offers: mockOffers,
    };

    const action = updateFavorites({ id: '1', isFavorite: true });
    const result = offersData.reducer(stateWithOffers, action);

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favoritesCount).toBe(2);
  });

  it('should not update favoritesCount if the offer id does not exist', () => {
    const stateWithOffers = {
      ...initialState,
      offers: mockOffers,
    };

    const action = updateFavorites({ id: '999', isFavorite: true });
    const result = offersData.reducer(stateWithOffers, action);

    expect(result.favoritesCount).toBe(1);
  });

  it('should handle empty offers array correctly', () => {
    const action = updateFavorites({ id: '1', isFavorite: true });
    const result = offersData.reducer(initialState, action);

    expect(result.offers).toEqual([]);
    expect(result.favoritesCount).toBe(0);
  });
});
