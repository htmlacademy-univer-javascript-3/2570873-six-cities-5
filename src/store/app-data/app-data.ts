import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../app/types/city.ts';
import { AppData } from '../../app/types/state.ts';
import { Cities, NameSpace, SortOptions } from '../../const.ts';

const initialState: AppData = {
  city: Cities[0],
  SortOptions: SortOptions.Popular,
  error: null,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortOptions>) => {
      state.SortOptions = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, setSortType, setError } = appData.actions;
