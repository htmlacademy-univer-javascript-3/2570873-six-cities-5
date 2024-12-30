import { AuthorizationStatus, SortOption } from '@const';
import { store } from '@store/index';
import { City } from './city';
import { Offers } from './offer';
import { OfferDetails } from './offer-details';
import { Reviews } from './review';
export type AppData = {
  city: City;
  sortOption: SortOption;
  error: string | null;
};
export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  userAvatarUrl: string | null;
};

export type CurrentOfferData = {
  offerInfo: OfferDetails | null;
  nearbyOffers: Offers;
  reviews: Reviews;
  isOfferInDetailsDataLoading: boolean;
};
export type OffersData = {
  offers: Offers;
  favoritesCount: number;
  isOffersDataLoading: boolean;
};
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
