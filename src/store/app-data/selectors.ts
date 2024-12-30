import { NameSpace, SortOption } from '@const';
import { City } from 'types/city';
import { State } from 'types/state';

export const getCity = (state: State): City => state[NameSpace.App]?.city;
export const getSortType = (state: State): SortOption =>
  state[NameSpace.App]?.sortOption;
export const getError = (state: State): string | null =>
  state[NameSpace.App]?.error;
