import { AuthorizationStatus } from '@const';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { describe, expect, it } from 'vitest';
import Header from './header';

const mockStore = configureStore([thunk]);

describe('Component: Header', () => {
  it('renders correctly when user is not authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatarUrl: null,
        userEmail: null,
      },
      OFFERS: { offers: [] },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('renders correctly when user is authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: 'https://example.com/avatar.jpg',
        userEmail: 'user@example.com',
      },
      OFFERS: {
        offers: [{ id: 1, isFavorite: true }, { id: 2, isFavorite: false }],
      },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays zero favorites count when no favorites exist', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatarUrl: 'https://example.com/avatar.jpg',
        userEmail: 'user@example.com',
      },
      OFFERS: {
        offers: [{ id: 1, isFavorite: false }, { id: 2, isFavorite: false }],
      },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
