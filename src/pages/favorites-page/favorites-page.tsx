import FavoritesEmpty from '@components/favorites-empty/favorites-empty';
import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import OffersList from '@components/offers-list/offers-list';
import { memo, useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/index';
import { getOffers } from '../../store/offers-data/selectors';

const FavoritesPage: React.FC = () => {
  const [, setActiveOfferId] = useState<string | number | null>(null);
  const offers = useAppSelector(getOffers);
  const favoriteOffers = useMemo(
    () => offers.filter((offer) => offer.isFavorite),
    [offers]
  );

  const handleActiveOfferChange = useCallback(
    (offerId: string | number | null) => {
      setActiveOfferId(offerId);
    },
    []
  );
  return (
    <div className="page">
      <Header />
      {favoriteOffers.length > 0 ? (
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
        </main>) : (
        <FavoritesEmpty />
      )}
      <Footer />
    </div>
  );
};

const MemoizedFavoritesScreen = memo(FavoritesPage);
export default MemoizedFavoritesScreen;
