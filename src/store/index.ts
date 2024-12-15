import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { reducer } from './reducer.ts';


export const api = createAPI();

export const store = configureStore({ reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  thunk: { extraArgument: api}
}) });
