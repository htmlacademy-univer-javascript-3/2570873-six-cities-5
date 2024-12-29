import { AppRoute, AuthorizationStatus } from '@const';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../mocks/mock-component';
import { makeFakeState } from '../mocks/mocks';
import App from './app';

describe('Application Routing', () => {
  it('should render LoadingScreen when auth status is unknown', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Unknown,
          userEmail: null,
          userAvatarUrl: null,
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: true
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render MainScreen on root route', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test@test.com',
          userAvatarUrl: 'avatar.jpg'
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('should render LoginScreen for unauthorized users', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    // Проверяем h1 "Sign in" или любой другой элемент, указывающий на страницу логина
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should render OfferPage on "/offer/:id" route', () => {
    const history = createMemoryHistory();
    // Допустим, переходим на /offer/123
    history.push(`${AppRoute.Offer}/123`);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test@test.com',
          userAvatarUrl: 'avatar.jpg'
        },
        OFFERS: {
          // Можете замокать оффер с id=123, если нужно
          offers: [
            // { id: 123, title: 'Test Offer', ... }
          ],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    // Предположим, на OfferPage есть заголовок "Offer details" или что-то подобное
    expect(screen.getByText(/offer/i)).toBeInTheDocument();
  });

  it('should render FavoritesPage for authorized users', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test@test.com',
          userAvatarUrl: 'avatar.jpg'
        },
        OFFERS: {
          // Допустим, есть какие-то избранные офферы
          offers: [],
          favoritesCount: 2,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    // Предположим, на FavoritesPage есть элемент с текстом "Saved listing" или "Favorites"
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
  });

  it('should redirect to LoginPage when user is not authorized and tries to access FavoritesPage', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should render NotFoundScreen for unknown route', () => {
    const history = createMemoryHistory();
    history.push('/unknown');

    const { withStoreComponent } = withStore(
      withHistory(<App />, history),
      makeFakeState({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
          userAvatarUrl: null
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});

