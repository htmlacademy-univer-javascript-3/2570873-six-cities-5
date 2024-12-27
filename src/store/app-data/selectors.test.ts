import { Cities, SortOptions } from '@const';
import { State } from 'types/state';
import { describe, expect, it } from 'vitest';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '../../mocks/state-mocks';
import { getCity, getError, getSortType } from './selectors';

describe('Selectors: appData', () => {
  const state: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return the current city', () => {
    expect(getCity(state)).toBe(Cities[2]);
  });

  it('should return the current sortType', () => {
    expect(getSortType(state)).toBe(SortOptions.PriceHighToLow);
  });

  it('should return the error message if present', () => {
    const stateWithError = {
      ...state,
      APP: { ...mockAppState, error: 'Test error' },
    };
    expect(getError(stateWithError)).toBe('Test error');
  });

  it('should return null if there is no error', () => {
    const stateWithoutError = {
      ...state,
      APP: { ...mockAppState, error: null },
    };
    expect(getError(stateWithoutError)).toBeNull();
  });
});
