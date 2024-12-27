import { AuthorizationStatus } from '@const';
import { mockAppState, mockCurrentOfferState, mockOffersState, mockUserState } from '@mocks/state-mocks';
import { describe, expect, it } from 'vitest';
import { State } from '../../types/state';
import { getAuthorizationStatus, getAvatarUrl, getUserEmail } from './selectors';

describe('User selectors', () => {
  const baseState: State = {
    APP: mockAppState,
    USER: mockUserState,
    CURRENT_OFFER: mockCurrentOfferState,
    OFFERS: mockOffersState,
  };

  it('should return authorizationStatus when Auth', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, authorizationStatus: AuthorizationStatus.Auth },
    };
    expect(getAuthorizationStatus(state)).toBe(AuthorizationStatus.Auth);
  });

  it('should return authorizationStatus when NoAuth', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, authorizationStatus: AuthorizationStatus.NoAuth },
    };
    expect(getAuthorizationStatus(state)).toBe(AuthorizationStatus.NoAuth);
  });

  it('should return userEmail when email is present', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, userEmail: 'test@example.com' },
    };
    expect(getUserEmail(state)).toBe('test@example.com');
  });

  it('should return null when userEmail is not set', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, userEmail: null },
    };
    expect(getUserEmail(state)).toBe(null);
  });

  it('should return userAvatarUrl when avatarUrl is present', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, userAvatarUrl: 'http://example.com/avatar.png' },
    };
    expect(getAvatarUrl(state)).toBe('http://example.com/avatar.png');
  });

  it('should return null when userAvatarUrl is not set', () => {
    const state = {
      ...baseState,
      USER: { ...mockUserState, userAvatarUrl: null },
    };
    expect(getAvatarUrl(state)).toBe(null);
  });
});
