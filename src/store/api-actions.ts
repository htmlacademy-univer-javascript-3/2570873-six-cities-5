import { APIRoute, AuthorizationStatus } from '@const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferDetails } from 'app/types/offer-details';
import { Review, Reviews } from 'app/types/review';
import { ReviewFormData } from 'app/types/review-data';
import { AxiosInstance } from 'axios';
import { AuthData } from '../app/types/auth-data';
import { Offer, Offers } from '../app/types/offer';
import { AppDispatch, State } from '../app/types/state';
import { User } from '../app/types/user';
import { dropToken, saveToken } from '../services/token';
import { requireAuthorization, sendReview, setOfferDetails, setOfferInDetailsDataLoadingStatus, setOffersDataLoadingStatus, setOffersList, setUserEmail, updateOfferFavoriteStatus } from '../store/action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data: response } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffersList(response));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data as { email: string };
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchOfferInDetailsAction = createAsyncThunk<void,
  {
    id: string;
  },
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOfferInDetails',
    async ({ id }, { dispatch, extra: api }) => {
      dispatch(setOfferInDetailsDataLoadingStatus(true));

      try {
        const { data: offerInfo } = await api.get<OfferDetails>(`${APIRoute.Offers}/${id}`);
        const { data: nearestOffers } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
        const { data: reviews } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);

        dispatch(setOfferDetails({ offerInfo, nearestOffers, reviews }));
      } finally {
        dispatch(setOfferInDetailsDataLoadingStatus(false));
      }
    }
  );


export const sendReviewAction = createAsyncThunk<void,
  {
    review: ReviewFormData;
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/sendReview',
    async ({ review, id }, { dispatch, extra: api }) => {
      const { data: responseReview } = await api.post<Review>(`${APIRoute.Comments}/${id}`,
        {
          comment: review.review,
          rating: review.rating,
        });
      dispatch(sendReview(responseReview));
    });

export const toggleFavoriteStatusAction = createAsyncThunk<void,
    { id: string; isFavorite: boolean },
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'offer/toggleFavoriteStatus',
      async ({ id, isFavorite }, { dispatch, extra: api }) => {
        const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${isFavorite ? 1 : 0}`);
        dispatch(updateOfferFavoriteStatus({ id: data.id, isFavorite: data.isFavorite }));
      }
    );

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    const { token, email: userEmail } = data;

    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(userEmail));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
