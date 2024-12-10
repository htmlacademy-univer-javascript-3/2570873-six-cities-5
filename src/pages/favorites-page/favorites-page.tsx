import React, { useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useAppSelector } from '../../hooks/index';

const FavoritesPage: React.FC = () => {
  const [, setActiveOfferId] = useState<string | number | null>(null);
  const offers = useAppSelector((state) => state.offersList);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const handleActiveOfferChange = (offerId: string | number | null) => {
    setActiveOfferId(offerId);
  };
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList
              offers={favoriteOffers}
              onActiveOfferChange={handleActiveOfferChange}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
