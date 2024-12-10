import { offersInDetails } from '@mocks/offer-details';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { createReducer } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OffersInDetails } from '../../src/app/types/offer-details';
import { Reviews } from '../../src/app/types/review';
import { changeCity, setOffersInDetails, setOffersList, setReviews, } from './action';

type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setOffersInDetails, (state) => {
      state.offersInDetails = offersInDetails;
    });
});
