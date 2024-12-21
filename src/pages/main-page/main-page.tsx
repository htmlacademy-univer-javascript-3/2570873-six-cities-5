import React, { useCallback, useMemo, useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { Cities, SortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { setSortOption } from '../../store/action';
import { selectFilteredAndSortedOffers } from '../../store/reducer';

const MainPage: React.FC = () => {
  const currentCityOffers = useAppSelector(selectFilteredAndSortedOffers);
  const city = useAppSelector((state) => state.city);
  const [activeOffer, setActiveOffer] = useState<string | number | null>(null);
  const selectedOffer = useMemo(() => currentCityOffers.find((offer) => offer.id === activeOffer), [activeOffer, currentCityOffers]);

  const dispatch = useAppDispatch();

  const handleSortChange = useCallback((option: SortOptions) => {
    dispatch(setSortOption(option));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCityOffers.length} places to stay in {city}
              </b>
              <SortingOptions onSortChange={handleSortChange} />
              <OffersList
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={currentCityOffers[0]?.city || {
                  location: { latitude: 0, longitude: 0, zoom: 10 },
                }}
                offers={currentCityOffers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
