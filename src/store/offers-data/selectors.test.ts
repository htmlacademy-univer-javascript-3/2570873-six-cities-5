import { describe, expect, it } from 'vitest';
import { makeFakeOffers, makeFakeState } from '../../mocks/mocks';
import { getFavoritesCount, getOffers, getOffersDataLoadingStatus } from './selectors';

describe('Selectors: offers', () => {
  const fakeOffers = makeFakeOffers(10);
  const favoritesCount = fakeOffers.filter((offer) => offer.isFavorite).length;
  const state = makeFakeState({
    OFFERS: {
      offers: fakeOffers,
      isOffersDataLoading: true,
      favoritesCount,
    },
  });

  it('should return the current offers', () => {
    expect(getOffers(state)).toEqual(fakeOffers);
  });

  it('should return the offers data loading status', () => {
    expect(getOffersDataLoadingStatus(state)).toBe(true);
  });

  it('should return the favorites count', () => {
    expect(getFavoritesCount(state)).toBe(favoritesCount);
  });

  it('should return an empty array if no offers are present', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...state.OFFERS, offers: [] },
    };
    expect(getOffers(modifiedState)).toEqual([]);
  });

  it('should return false if offers data is not loading', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...state.OFFERS, isOffersDataLoading: false },
    };
    expect(getOffersDataLoadingStatus(modifiedState)).toBe(false);
  });

  it('should return 0 if there are no favorite offers', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...state.OFFERS, favoritesCount: 0 },
    };
    expect(getFavoritesCount(modifiedState)).toBe(0);
  });
});
