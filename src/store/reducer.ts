import { offersInDetails } from '@mocks/offer-details';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OffersInDetails } from '../../src/app/types/offer-details';
import { Reviews } from '../../src/app/types/review';
import { SortOptions } from '../const';
import { changeCity, setOffersInDetails, setOffersList, setReviews, setSortOption } from './action';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
  sortOption: SortOptions;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: [],
  sortOption: SortOptions.Popular,
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
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    });
});

export const selectFilteredAndSortedOffers = createSelector(
  [
    (state: StateType) => state.offersList,
    (state: StateType) => state.city,
    (state: StateType) => state.sortOption,
  ],
  (offersList, city, sortOption) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    switch (sortOption) {
      case SortOptions.PriceLowToHigh:
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case SortOptions.PriceHighToLow:
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case SortOptions.TopRated:
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }
);
