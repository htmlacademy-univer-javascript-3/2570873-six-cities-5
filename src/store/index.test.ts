import { NameSpace } from '@const';
import { store } from './index';

describe('Store Configuration', () => {
  it('should contain all reducers from the rootReducer', () => {
    const state = store.getState();

    expect(state).toHaveProperty(NameSpace.App);
    expect(state).toHaveProperty(NameSpace.User);
    expect(state).toHaveProperty(NameSpace.CurrentOffer);
    expect(state).toHaveProperty(NameSpace.Offers);
  });
});
