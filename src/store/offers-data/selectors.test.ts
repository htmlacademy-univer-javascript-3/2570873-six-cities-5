import { State } from 'types/state';
import { describe, expect, it } from 'vitest';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '../../mocks/state-mocks';
import { getFavoritesCount, getOffers, getOffersDataLoadingStatus } from './selectors';

describe('Selectors: offers', () => {
  const state: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return the current offers', () => {
    expect(getOffers(state)).toEqual(mockOffersState.offers);
  });

  it('should return the offers data loading status', () => {
    expect(getOffersDataLoadingStatus(state)).toBe(mockOffersState.isOffersDataLoading);
  });

  it('should return the favorites count', () => {
    expect(getFavoritesCount(state)).toBe(mockOffersState.favoritesCount);
  });

  it('should return an empty array if no offers are present', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...mockOffersState, offers: [] },
    };
    expect(getOffers(modifiedState)).toEqual([]);
  });

  it('should return false if offers data is not loading', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...mockOffersState, isOffersDataLoading: false },
    };
    expect(getOffersDataLoadingStatus(modifiedState)).toBe(false);
  });

  it('should return 0 if there are no favorite offers', () => {
    const modifiedState = {
      ...state,
      OFFERS: { ...mockOffersState, favoritesCount: 0 },
    };
    expect(getFavoritesCount(modifiedState)).toBe(0);
  });
});
