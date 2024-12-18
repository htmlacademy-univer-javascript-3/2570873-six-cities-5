import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../../src/app/types/offer';
import { OfferDetails } from '../../src/app/types/offer-details';
import { Review, Reviews } from '../../src/app/types/review';
import { AuthorizationStatus, SortOptions } from '../const';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOfferDetails = createAction<{ offerInfo: OfferDetails; nearestOffers: Offers; reviews: Reviews }>('offers/loadOfferDetails');

export const changeCity = createAction<string>('city/changeCity');
export const setSortOption = createAction<SortOptions>('setSortOption');
export const sendReview = createAction<Review>('review/send');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('data/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const setOfferInDetailsDataLoadingStatus = createAction<boolean>('data/setOfferInDetailsDataLoadingStatus');
export const updateOfferFavoriteStatus = createAction<{ id: string; isFavorite: boolean }>('offer/updateFavoriteStatus');
export const setUserEmail = createAction<string>('setUserEmail');
