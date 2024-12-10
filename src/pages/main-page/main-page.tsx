import { Offers } from 'app/types/offer';
import React, { useEffect, useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { Cities } from '../../const';
import { useAppSelector } from '../../hooks/index';


const MainPage: React.FC = () => {
  const offers = useAppSelector((state) => state.offersList);
  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);
  const [activeOffer, setActiveOffer] = useState<string | number | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOffer);
  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);
  const sortingOptions = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first',
  ];

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCityOffers.length} places to stay in {city}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {sortingOptions.map((option) => (
                    <li key={option} className="places__option" tabIndex={0}>
                      {option}
                    </li>
                  ))}
                </ul>
              </form>
              <OffersList
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={currentCityOffers[0]?.city || {
                  location: { latitude: 0, longitude: 0, zoom: 10 }}}
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
