import { APIRoute } from '@const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from 'types/state';
import { vi } from 'vitest';
import { makeFakeOffer, makeFakeOfferDetails, makeFakeOffers, makeFakeReview } from '../mocks/mocks';
import { createAPI } from '../services/api';
import * as tokenStorage from '../services/token';
import { checkAuthAction, fetchOfferInDetailsAction, fetchOffersAction, loginAction, logoutAction, updateFavoriteStatusAction } from './api-actions';

type DispatchExts = ThunkDispatch<State, AxiosInstance, Action<string>>;

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>, DispatchExts>(middlewares);

describe('Async Thunks', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore();
    mockAPI.reset();
  });

  it('fetchOffersAction should dispatch actions correctly', async () => {
    const mockOffers = [makeFakeOffer()];
    mockAPI.onGet(APIRoute.Offers).reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toContain(fetchOffersAction.pending.type);
    expect(actions).toContain('OFFERS/loadOffers');
    expect(actions).toContain(fetchOffersAction.fulfilled.type);
  });

  it('fetchOfferInDetailsAction should dispatch actions correctly', async () => {
    const mockOfferDetails = makeFakeOfferDetails();
    const mockId = '123';

    mockAPI.onGet(`${APIRoute.Offers}/${mockId}`).reply(200, mockOfferDetails);
    mockAPI.onGet(`${APIRoute.Offers}/${mockId}/nearby`).reply(200, makeFakeOffers(3));
    mockAPI.onGet(`${APIRoute.Comments}/${mockId}`).reply(200, [makeFakeReview()]);

    await store.dispatch(fetchOfferInDetailsAction({ id: mockId }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchOfferInDetailsAction.pending.type,
      'CURRENT_OFFER/setOfferInDetailsDataLoadingStatus',
      'CURRENT_OFFER/loadOfferInDetails',
      'CURRENT_OFFER/setOfferInDetailsDataLoadingStatus',
      fetchOfferInDetailsAction.fulfilled.type,
    ]);
  });


  it('checkAuthAction should dispatch actions correctly', async () => {
    const mockUser = { email: 'test@example.com', avatarUrl: 'avatar.png' };

    mockAPI.onGet(APIRoute.Login).reply(200, mockUser);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      'USER/setAuthorizationStatus',
      'USER/setUserEmail',
      'USER/setUserAvatarUrl',
      checkAuthAction.fulfilled.type,
    ]);
  });


  it('logoutAction should dispatch actions correctly', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);
    const mockDropToken = vi.spyOn(tokenStorage, 'dropToken').mockImplementation(() => {});

    await store.dispatch(logoutAction());

    expect(mockDropToken).toHaveBeenCalled();
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      logoutAction.pending.type,
      'USER/setAuthorizationStatus',
      fetchOffersAction.pending.type,
      'OFFERS/setOffersDataLoadingStatus',
      logoutAction.fulfilled.type,
    ]);

    mockDropToken.mockRestore();
  });

  it('updateFavoriteStatusAction should update favorites status correctly', async () => {
    const mockOffer = makeFakeOffers()[0];
    const mockId = '1';
    const isFavorite = true;

    mockAPI.onPost(`${APIRoute.Favorite}/${mockId}/${isFavorite ? 1 : 0}`).reply(200, mockOffer);

    await store.dispatch(updateFavoriteStatusAction({ id: mockId, isFavorite }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      updateFavoriteStatusAction.pending.type,
      'OFFERS/updateFavorites',
      updateFavoriteStatusAction.fulfilled.type,
    ]);
  });

  describe('fetchOffersAction', () => {
    it('should handle server error correctly', async () => {
      mockAPI.onGet(APIRoute.Offers).reply(500);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions().map((action) => action.type);

      expect(actions).toContain(fetchOffersAction.rejected.type);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch NoAuth status when server responds with error', async () => {
      mockAPI.onGet(APIRoute.Login).reply(401, { error: 'Unauthorized' });

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        'USER/setAuthorizationStatus',
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch Auth status when authorized', async () => {
      const mockUser = { email: 'test@test.com', avatarUrl: 'avatar.jpg' };
      mockAPI.onGet(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        'USER/setAuthorizationStatus',
        'USER/setUserEmail',
        'USER/setUserAvatarUrl',
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should handle login failure correctly', async () => {
      mockAPI.onPost(APIRoute.Login).reply(400, { error: 'Bad Request' });
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken').mockImplementation(() => {});

      await store.dispatch(loginAction({ login: 'invalid@example.com', password: 'wrongpassword' }));

      expect(mockSaveToken).not.toHaveBeenCalled();
      const actions = store.getActions().map((action) => action.type);
      expect(actions).toContain(loginAction.rejected.type);

      mockSaveToken.mockRestore();
    });
  });

  describe('logoutAction', () => {
    it('should handle logout failure correctly', async () => {
      mockAPI.onDelete(APIRoute.Logout).reply(500);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken').mockImplementation(() => {});

      await store.dispatch(logoutAction());

      expect(mockDropToken).not.toHaveBeenCalled();
      const actions = store.getActions().map((action) => action.type);
      expect(actions).toContain(logoutAction.rejected.type);

      mockDropToken.mockRestore();
    });
  });
});
