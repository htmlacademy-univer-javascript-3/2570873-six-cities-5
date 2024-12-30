import { makeFakeState } from '@mocks/mocks';
import { describe, expect, it } from 'vitest';
import { getNearbyOffers, getOfferInDetails, getOfferInDetailsDataLoadingStatus, getReviews } from './selectors';

describe('Selectors: currentOfferData', () => {
  const state = makeFakeState();

  it('should return offer details', () => {
    expect(getOfferInDetails(state)).toEqual(state.CURRENT_OFFER.offerInfo);
  });

  it('should return null if offer details are not available', () => {
    const modifiedState = { ...state, CURRENT_OFFER: { ...state.CURRENT_OFFER, offerInfo: null } };
    expect(getOfferInDetails(modifiedState)).toBeNull();
  });

  it('should return nearby offers', () => {
    expect(getNearbyOffers(state)).toEqual(state.CURRENT_OFFER.nearbyOffers);
  });

  it('should return an empty array if no nearby offers are available', () => {
    const modifiedState = { ...state, CURRENT_OFFER: { ...state.CURRENT_OFFER, nearbyOffers: [] } };
    expect(getNearbyOffers(modifiedState)).toEqual([]);
  });

  it('should return reviews', () => {
    expect(getReviews(state)).toEqual(state.CURRENT_OFFER.reviews);
  });

  it('should return an empty array if no reviews are available', () => {
    const modifiedState = { ...state, CURRENT_OFFER: { ...state.CURRENT_OFFER, reviews: [] } };
    expect(getReviews(modifiedState)).toEqual([]);
  });

  it('should return the loading status of offer details', () => {
    const modifiedState = { ...state, CURRENT_OFFER: { ...state.CURRENT_OFFER, isOfferInDetailsDataLoading: true } };
    expect(getOfferInDetailsDataLoadingStatus(modifiedState)).toBe(true);
  });

  it('should return false if offer details are not loading', () => {
    expect(getOfferInDetailsDataLoadingStatus(state)).toBe(false);
  });
});
