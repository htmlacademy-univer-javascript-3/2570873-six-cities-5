import { describe, expect, it } from 'vitest';
import { makeFakeNearbyOffers, makeFakeOfferDetails, makeFakeReview, makeFakeReviews } from '../../mocks/mocks';
import { currentOfferData, loadOfferInDetails, sendReview, setOfferInDetailsDataLoadingStatus } from './current-offer-data';

const initialOfferState = {
  offerInfo: null,
  nearbyOffers: [],
  reviews: [],
  isOfferInDetailsDataLoading: false,
};

describe('Reducer: currentOfferData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = currentOfferData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialOfferState);
  });

  it('should load offer details, nearby offers, and reviews', () => {
    const action = loadOfferInDetails({
      offerInfo: makeFakeOfferDetails(),
      nearestOffers: makeFakeNearbyOffers(3),
      reviews: makeFakeReviews(5),
    });
    const result = currentOfferData.reducer(initialOfferState, action);

    expect(result.offerInfo).toEqual(action.payload.offerInfo);
    expect(result.nearbyOffers).toEqual(action.payload.nearestOffers);
    expect(result.reviews).toEqual(action.payload.reviews);
  });

  it('should add a new review', () => {
    const action = sendReview(makeFakeReview());
    const result = currentOfferData.reducer(
      { ...initialOfferState, reviews: makeFakeReviews(5) },
      action
    );

    expect(result.reviews).toContain(action.payload);
    expect(result.reviews.length).toBe(6);
  });

  it('should set loading status to true', () => {
    const action = setOfferInDetailsDataLoadingStatus(true);
    const result = currentOfferData.reducer(initialOfferState, action);

    expect(result.isOfferInDetailsDataLoading).toBe(true);
  });

  it('should reset loading status to false', () => {
    const action = setOfferInDetailsDataLoadingStatus(false);
    const result = currentOfferData.reducer(
      { ...initialOfferState, isOfferInDetailsDataLoading: true },
      action
    );

    expect(result.isOfferInDetailsDataLoading).toBe(false);
  });
});
