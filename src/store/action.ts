import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OffersInDetails } from '../../src/app/types/offer-details';
import { Reviews } from '../../src/app/types/review';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffersInDetails = createAction<OffersInDetails>(
  'offers/setOffersInDetails'
);
export const changeCity = createAction<string>('city/changeCity');
