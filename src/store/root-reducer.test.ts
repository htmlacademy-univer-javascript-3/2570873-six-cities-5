import { NameSpace } from '@const';
import { rootReducer } from './root-reducer';

describe('Root Reducer', () => {
  it('should return the initial state', () => {
    const initialState = rootReducer(undefined, { type: '' });

    expect(Object.keys(initialState)).toEqual([
      NameSpace.App,
      NameSpace.User,
      NameSpace.CurrentOffer,
      NameSpace.Offers,
    ]);
  });
});
