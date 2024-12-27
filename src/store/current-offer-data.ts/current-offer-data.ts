import { NameSpace } from '@const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from 'types/offer';
import { OfferDetails } from 'types/offer-details';
import { Review, Reviews } from 'types/review';
import { CurrentOfferData } from 'types/state';

const initialState: CurrentOfferData = {
  offerInfo: null,
  nearbyOffers: [],
  reviews: [],
  isOfferInDetailsDataLoading: false,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOfferInDetails: (
      state,
      action: PayloadAction<{
        offerInfo: OfferDetails;
        nearestOffers: Offers;
        reviews: Reviews;
      }>
    ) => {
      state.offerInfo = action.payload.offerInfo;
      state.nearbyOffers = action.payload.nearestOffers;
      state.reviews = action.payload.reviews;
    },
    sendReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setOfferInDetailsDataLoadingStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isOfferInDetailsDataLoading = action.payload;
    },
  },
});

export const {
  loadOfferInDetails,
  sendReview,
  setOfferInDetailsDataLoadingStatus,
} = currentOfferData.actions;
