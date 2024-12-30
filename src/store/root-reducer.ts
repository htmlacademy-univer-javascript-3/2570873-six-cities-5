import { NameSpace } from '@const';
import { combineReducers } from '@reduxjs/toolkit';
import { appData } from './app-data/app-data';
import { currentOfferData } from './current-offer-data/current-offer-data';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
  [NameSpace.Offers]: offersData.reducer,
});
