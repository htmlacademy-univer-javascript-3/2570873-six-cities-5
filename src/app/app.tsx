import { AppRoute, AuthorizationStatus } from '@const';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/private-route/private-route';
import { useAppSelector } from '../hooks/index';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import { LoginPage } from '../pages/login-page/login-page';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { OfferPage } from '../pages/offer-page/offer-page';
import { getAuthorizationStatus } from '../store/user-process/selectors';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <p>Loading</p>;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}
