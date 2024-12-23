import { AuthorizationStatus, NameSpace } from '@const';
import { State } from '../../app/types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: State): string | null =>
  state[NameSpace.User].userEmail;
export const getAvatarUrl = (state: State): string | null =>
  state[NameSpace.User].userAvatarUrl;
