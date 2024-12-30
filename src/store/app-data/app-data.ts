import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from 'types/city.ts';
import { AppData } from 'types/state.ts';
import { Cities, NameSpace, SortOption } from '../../const.ts';

const initialState: AppData = {
  city: Cities[0],
  sortOption: SortOption.Popular,
  error: null,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, setSortType, setError } = appData.actions;
