import { CombinedState, createAction } from '@reduxjs/toolkit';
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { AppData, CurrentOfferData, OffersData, UserProcess } from 'types/state';
import browserHistory from '../../browser-history';
import { redirect } from './redirect';

describe('Middleware: redirect', () => {
  it('should redirect to the correct route when action type is "redirectToRoute"', () => {
    const mockApi = {} as MiddlewareAPI<Dispatch<AnyAction>, CombinedState<{
      APP: AppData;
      USER: UserProcess;
      CURRENT_OFFER: CurrentOfferData;
      OFFERS: OffersData;
    }>>;
    const mockNext = vi.fn();
    const mockAction = createAction<string>('redirectToRoute')('/test-path');
    const browserHistorySpy = vi.spyOn(browserHistory, 'push');

    redirect(mockApi)(mockNext)(mockAction);

    expect(browserHistorySpy).toHaveBeenCalledWith('/test-path');
    expect(mockNext).toHaveBeenCalledWith(mockAction);
  });

  it('should call next if action type is not "redirectToRoute"', () => {
    const mockApi = {} as MiddlewareAPI<Dispatch<AnyAction>, CombinedState<{
      APP: AppData;
      USER: UserProcess;
      CURRENT_OFFER: CurrentOfferData;
      OFFERS: OffersData;
    }>>;
    const mockNext = vi.fn();
    const mockAction = { type: 'otherAction', payload: '/test-path' };
    const browserHistorySpy = vi.spyOn(browserHistory, 'push');

    redirect(mockApi)(mockNext)(mockAction);

    expect(browserHistorySpy).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockAction);
  });
});
