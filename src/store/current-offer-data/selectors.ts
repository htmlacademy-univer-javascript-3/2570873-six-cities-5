import { Offers } from 'types/offer';
import { OfferDetails } from 'types/offer-details';
import { Reviews } from 'types/review';
import { State } from 'types/state';
import { NameSpace } from '../../const';

export const getOfferInDetails = (state: State): OfferDetails | null =>
  state[NameSpace.CurrentOffer].offerInfo;
export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): Reviews =>
  state[NameSpace.CurrentOffer].reviews;
export const getOfferInDetailsDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.CurrentOffer].isOfferInDetailsDataLoading;
