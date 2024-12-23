import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { appData } from './app-data/app-data';
import { currentOfferData } from './current-offer-data.ts/current-offer-data.ts';
import { offersData } from './offers-data/offers-data.ts';
import { userProcess } from './user-process/user-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
  [NameSpace.Offers]: offersData.reducer,
});
