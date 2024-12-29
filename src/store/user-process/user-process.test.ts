import { AuthorizationStatus } from '@const';
import { describe, expect, it } from 'vitest';
import { setAuthorizationStatus, setUserAvatarUrl, setUserEmail, userProcess } from './user-process';

const initialState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: null,
  userAvatarUrl: null,
};

describe('Reducer: userProcess', () => {
  it('should return the initial state when initialized with undefined state', () => {
    const result = userProcess.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should correctly handle setAuthorizationStatus to Auth', () => {
    const action = setAuthorizationStatus(AuthorizationStatus.Auth);
    const result = userProcess.reducer(initialState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should correctly handle setAuthorizationStatus to NoAuth', () => {
    const action = setAuthorizationStatus(AuthorizationStatus.NoAuth);
    const result = userProcess.reducer(
      { ...initialState, authorizationStatus: AuthorizationStatus.Auth },
      action
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should update userEmail with a new value', () => {
    const email = 'newuser@example.com';
    const action = setUserEmail(email);
    const result = userProcess.reducer(initialState, action);
    expect(result.userEmail).toBe(email);
  });

  it('should update userAvatarUrl with a new value', () => {
    const avatarUrl = 'https://example.com/new-avatar.png';
    const action = setUserAvatarUrl(avatarUrl);
    const result = userProcess.reducer(initialState, action);
    expect(result.userAvatarUrl).toBe(avatarUrl);
  });
});
