import { AppRoute } from '../const';
import { redirectToRoute } from './action';

describe('Actions', () => {
  it('should create an action to redirect to a route', () => {
    const expectedAction = {
      type: 'route/redirect',
      payload: AppRoute.Root,
    };

    expect(redirectToRoute(AppRoute.Root)).toEqual(expectedAction);
  });
});
