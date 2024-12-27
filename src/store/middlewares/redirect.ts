import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import browserHistory from 'types/browser-history';
import { rootReducer } from '../../store/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;
export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
