import { AuthorizationStatus } from '@const';
import { describe, expect, it } from 'vitest';
import { makeFakeState } from '../../mocks/mocks';
import { getAuthorizationStatus, getAvatarUrl, getUserEmail } from './selectors';

describe('User selectors', () => {
  const state = makeFakeState();

  it('should return authorizationStatus when Auth', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, authorizationStatus: AuthorizationStatus.Auth },
    };
    expect(getAuthorizationStatus(modifiedState)).toBe(AuthorizationStatus.Auth);
  });

  it('should return authorizationStatus when NoAuth', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, authorizationStatus: AuthorizationStatus.NoAuth },
    };
    expect(getAuthorizationStatus(modifiedState)).toBe(AuthorizationStatus.NoAuth);
  });

  it('should return userEmail when email is present', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, userEmail: 'test@example.com' },
    };
    expect(getUserEmail(modifiedState)).toBe('test@example.com');
  });

  it('should return null when userEmail is not set', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, userEmail: null },
    };
    expect(getUserEmail(modifiedState)).toBe(null);
  });

  it('should return userAvatarUrl when avatarUrl is present', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, userAvatarUrl: 'http://example.com/avatar.png' },
    };
    expect(getAvatarUrl(modifiedState)).toBe('http://example.com/avatar.png');
  });

  it('should return null when userAvatarUrl is not set', () => {
    const modifiedState = {
      ...state,
      USER: { ...state.USER, userAvatarUrl: null },
    };
    expect(getAvatarUrl(modifiedState)).toBe(null);
  });
});
