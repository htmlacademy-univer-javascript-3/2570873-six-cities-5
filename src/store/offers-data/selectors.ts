import { NameSpace } from '@const';
import { Offer } from '../../app/types/offer';
import { State } from '../../app/types/state';

export const getOffers = (state: State): Offer[] =>
  state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offers].isOffersDataLoading;
export const getFavoritesCount = (state: State): number =>
  state[NameSpace.Offers].favoritesCount;
