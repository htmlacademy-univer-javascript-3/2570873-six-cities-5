import { createReducer, createSelector } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OffersInDetails } from '../../src/app/types/offer-details';
import { Reviews } from '../../src/app/types/review';
import { AuthorizationStatus, SortOptions } from '../const';
import { changeCity, setOffersInDetails, setOffersList, setReviews, setSortOption, setUserEmail } from './action';


type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
  sortOption: SortOptions;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  userEmail: string;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: [],
  sortOption: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  userEmail: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOffersInDetails, (state, action) => {
      state.offersInDetails = action.payload;
    })
    .addCase(setSortOption, (state, { payload }) => {
      state.sortOption = payload;
    })
    .addCase(setUserEmail, (state, { payload }) => {
      state.userEmail = payload;
    });
});

export const selectFilteredAndSortedOffers = createSelector(
  [
    (state: StateType) => state.offersList,
    (state: StateType) => state.city,
    (state: StateType) => state.sortOption,
  ],
  (offersList, city, sortOption) => {
    const filteredOffers = offersList.filter((offer) => offer.city.name === city);
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
