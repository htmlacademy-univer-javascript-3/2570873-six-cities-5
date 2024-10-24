import { Offer } from 'app/types/offer';
import { OffersInDetails } from 'app/types/offer-details';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/private-route/private-route';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import OfferPage from '../pages/offer-page/offer-page';

type AppProps = {
  places: number;
  offers: Offer[];
  offersInDetails: OffersInDetails;
};

const App: React.FC<AppProps> = ({ places, offers, offersInDetails }) => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage places={places} offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage offersInDetails={offersInDetails} />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
