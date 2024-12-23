import React, { useMemo, useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { SortOptions } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getCity, getSortType } from '../../store/app-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';

const MainPage: React.FC = () => {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);

  const [activeOffer, setActiveOffer] = useState<string | number | null>(null);
  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.id === activeOffer),
    [activeOffer, offers]
  );

  const currentCityOffers = useMemo(() => {
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === city.name
    );

    return [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case SortOptions.PriceLowToHigh:
          return a.price - b.price;
        case SortOptions.PriceHighToLow:
          return b.price - a.price;
        case SortOptions.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [city, offers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCityOffers.length} places to stay in {city.name}
              </b>
              <SortingOptions />
              <OffersList
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={
                  currentCityOffers[0]?.city || {
                    location: { latitude: 0, longitude: 0, zoom: 10 },
                  }
                }
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
