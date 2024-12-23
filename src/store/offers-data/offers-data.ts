import { NameSpace } from '@const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../app/types/offer';
import { OffersData } from '../../app/types/state';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
  favoritesCount: 0,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    updateFavorites: (
      state,
      action: PayloadAction<{ id: string; isFavorite: boolean }>
    ) => {
      const { id, isFavorite } = action.payload;

      const updateFavoriteStatus = (offers: Offers) => {
        const offerIndex = offers.findIndex((offer) => offer.id === id);
        if (offerIndex !== -1) {
          offers[offerIndex].isFavorite = isFavorite;
        }
      };

      updateFavoriteStatus(state.offers);

      state.favoritesCount = state.offers.filter(
        (offer) => offer.isFavorite
      ).length;
    },
  },
});

export const { loadOffers, setOffersDataLoadingStatus, updateFavorites } =
  offersData.actions;
