import { mockNearbyOffers, mockNewReview, mockOfferInfo, mockReviews } from '@mocks/mocks';
import { describe, expect, it } from 'vitest';
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
      offerInfo: mockOfferInfo,
      nearestOffers: mockNearbyOffers,
      reviews: mockReviews,
    });
    const result = currentOfferData.reducer(initialOfferState, action);

    expect(result.offerInfo).toEqual(mockOfferInfo);
    expect(result.nearbyOffers).toEqual(mockNearbyOffers);
    expect(result.reviews).toEqual(mockReviews);
  });

  it('should add a new review', () => {
    const action = sendReview(mockNewReview);
    const result = currentOfferData.reducer(
      { ...initialOfferState, reviews: mockReviews },
      action
    );

    expect(result.reviews).toContain(mockNewReview);
    expect(result.reviews.length).toBe(mockReviews.length + 1);
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
