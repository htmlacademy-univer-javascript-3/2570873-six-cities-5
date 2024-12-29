import { State } from 'types/state';
import { describe, expect, it } from 'vitest';
import { makeFakeState } from '../../mocks/mocks';
import { getCity, getError, getSortType } from './selectors';

describe('Selectors: appData', () => {
  const state: State = makeFakeState();

  it('should return the current city', () => {
    expect(getCity(state)).toBe(state.APP.city);
  });

  it('should return the current sortType', () => {
    expect(getSortType(state)).toBe(state.APP.SortOptions);
  });

  it('should return the error message if present', () => {
    const stateWithError = {
      ...state,
      APP: { ...state.APP, error: 'Test error' },
    };
    expect(getError(stateWithError)).toBe('Test error');
  });

  it('should return null if there is no error', () => {
    const stateWithoutError = {
      ...state,
      APP: { ...state.APP, error: null },
    };
    expect(getError(stateWithoutError)).toBeNull();
  });
});
