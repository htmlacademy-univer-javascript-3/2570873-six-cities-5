import { Offers } from '../../app/types/offer';
import { OfferDetails } from '../../app/types/offer-details';
import { Reviews } from '../../app/types/review';
import { State } from '../../app/types/state';
import { NameSpace } from '../../const';

export const getOfferInDetails = (state: State): OfferDetails | null =>
  state[NameSpace.CurrentOffer].offerInfo;
export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): Reviews =>
  state[NameSpace.CurrentOffer].reviews;
export const getOfferInDetailsDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.CurrentOffer].isOfferInDetailsDataLoading;
