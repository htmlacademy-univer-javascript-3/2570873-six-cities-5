import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { offers } from '../../mocks/offers';

const FavoritesPage: React.FC = () => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList offers={favoriteOffers} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
