import { describe, expect, it } from 'vitest';
import { Cities, SortOption } from '../../const';
import { appData, changeCity, setError, setSortType } from './app-data';

const initialState = {
  city: Cities[0],
  sortOption: SortOption.Popular,
  error: null,
};

describe('Reducer: appData', () => {
  it('should return the initial state when passed an empty action', () => {
    const result = appData.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should update the city when changeCity action is dispatched', () => {
    const newCity = Cities[1];
    const action = changeCity(newCity);
    const result = appData.reducer(initialState, action);
    expect(result.city).toBe(newCity);
  });

  it('should update the sortType when setSortType action is dispatched', () => {
    const newSortOption = SortOption.PriceLowToHigh;
    const action = setSortType(newSortOption);
    const result = appData.reducer(initialState, action);
    expect(result.sortOption).toBe(newSortOption);
  });

  it('should update the error message when setError action is dispatched', () => {
    const errorMessage = 'Test error';
    const action = setError(errorMessage);
    const result = appData.reducer(initialState, action);
    expect(result.error).toBe(errorMessage);
  });

  it('should reset the error message to null when setError action is dispatched with null', () => {
    const stateWithError = { ...initialState, error: 'Test error' };
    const action = setError(null);
    const result = appData.reducer(stateWithError, action);
    expect(result.error).toBeNull();
  });
});
