import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/private-route/private-route';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import OfferPage from '../pages/offer-page/offer-page';
import { setOffersInDetails, setOffersList, setReviews } from '../store/action';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offersList);
  const reviews = useAppSelector((state) => state.reviews);
  const offersInDetails = useAppSelector((state) => state.offersInDetails);
  const dispatch = useAppDispatch();
  dispatch(setOffersList(offers));
  dispatch(setReviews(reviews));
  dispatch(setOffersInDetails(offersInDetails));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/offer/:id"
            element={
              <OfferPage />
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
