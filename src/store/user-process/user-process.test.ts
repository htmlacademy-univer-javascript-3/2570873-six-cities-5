import { AuthorizationStatus } from '@const';
import { describe, expect, it } from 'vitest';
import { setAuthorizationStatus, setUserAvatarUrl, setUserEmail, userProcess } from './user-process';

// Начальное состояние
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
    const result = userProcess.reducer({ ...initialState, authorizationStatus: AuthorizationStatus.Auth }, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should update userEmail with a new value', () => {
    const email = 'newuser@example.com';
    const action = setUserEmail(email);
    const result = userProcess.reducer(initialState, action);
    expect(result.userEmail).toBe(email);
  });

  it('should reset userEmail to null when setUserEmail is dispatched with null', () => {
    const email = 'test@example.com';
    const action = setUserEmail(email);
    const result = userProcess.reducer({ ...initialState, userEmail: 'existing@example.com' }, action);
    expect(result.userEmail).toBeNull();
  });

  it('should update userAvatarUrl with a new value', () => {
    const avatarUrl = 'https://example.com/new-avatar.png';
    const action = setUserAvatarUrl(avatarUrl);
    const result = userProcess.reducer(initialState, action);
    expect(result.userAvatarUrl).toBe(avatarUrl);
  });

  it('should reset userAvatarUrl to null when setUserAvatarUrl is dispatched with null', () => {
    const avatarUrl = 'avatar.png';
    const action = setUserAvatarUrl(avatarUrl);
    const result = userProcess.reducer({ ...initialState, userAvatarUrl: 'https://example.com/existing-avatar.png' }, action);
    expect(result.userAvatarUrl).toBeNull();
  });
});
