import { AuthorizationStatus, Cities, SortOption } from '@const';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '@services/api';
import { datatype, date, image, internet, lorem, name, random } from 'faker';
import { Offers } from 'types/offer';
import { OfferDetails } from 'types/offer-details';
import { Reviews } from 'types/review';
import { State } from 'types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOffer = (): Offers[number] => ({
  id: datatype.uuid(),
  title: lorem.words(3),
  type: random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: datatype.number({ min: 50, max: 1000 }),
  previewImage: image.imageUrl(),
  city: random.arrayElement(Cities),
  location: {
    latitude: datatype.float({ min: 48.8, max: 49.0, precision: 0.000001 }),
    longitude: datatype.float({ min: 2.3, max: 2.4, precision: 0.000001 }),
    zoom: datatype.number({ min: 12, max: 16 })
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 })
});

export const makeFakeOfferDetails = (): OfferDetails => ({
  ...makeFakeOffer(),
  description: lorem.paragraph(),
  bedrooms: datatype.number({ min: 1, max: 5 }),
  maxAdults: datatype.number({ min: 1, max: 8 }),
  goods: Array.from(
    { length: datatype.number({ min: 3, max: 8 }) },
    () => random.arrayElement(['Washing machine', 'Dishwasher', 'Coffee maker', 'Fridge', 'Kitchen', 'TV', 'Air conditioning'])
  ),
  host: {
    name: name.findName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    email: internet.email(),
    token: datatype.uuid()
  },
  images: Array.from({ length: 6 }, () => image.imageUrl())
});

export const makeFakeReview = (): Reviews[number] => ({
  id: datatype.uuid(),
  date: date.recent().toISOString(),
  user: {
    name: name.findName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
    email: internet.email(),
    token: datatype.uuid()
  },
  comment: lorem.sentence(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 })
});

export const makeFakeReviews = (count = 5): Reviews =>
  Array.from({ length: count }, () => makeFakeReview());

export const makeFakeOffers = (count = 5): Offers =>
  Array.from({ length: count }, () => makeFakeOffer());

export const makeFakeNearbyOffers = (count = 3): Offers =>
  makeFakeOffers(count);

export const makeFakeState = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userEmail: 'test@example.com',
    userAvatarUrl: 'avatar.png'
  },
  APP: {
    city: Cities[2],
    sortOption: SortOption.PriceHighToLow,
    error: null
  },
  CURRENT_OFFER: {
    offerInfo: makeFakeOfferDetails(),
    nearbyOffers: makeFakeNearbyOffers(3),
    reviews: makeFakeReviews(5),
    isOfferInDetailsDataLoading: false
  },
  OFFERS: {
    offers: makeFakeOffers(10),
    favoritesCount: 1,
    isOffersDataLoading: false
  },
  ...initialState
});

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
