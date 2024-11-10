import { Offer } from 'app/types/offer';
import React, { useState } from 'react';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';

type MainPageProps = {
  places: number;
  offers: Offer[];
};

const MainPage: React.FC<MainPageProps> = ({ places, offers }) => {
  const [activeOffer, setActiveOffer] = useState<string | number | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOffer);
  const cities = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ];
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
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li key={city} className="locations__item">
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {places} places to stay in Amsterdam
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
                offers={offers}
                onActiveOfferChange={setActiveOffer}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={offers[0].city}
                offers={offers}
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
