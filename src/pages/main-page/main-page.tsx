import React from 'react';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

type MainPageProps = {
  places: number;
};

const MainPage: React.FC<MainPageProps> = ({ places }) => {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
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
              <b className="places__found">{places} places to stay in Amsterdam</b>
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
              <div className="cities__places-list places__list tabs__content">
                <PlaceCard
                  isPremium
                  imageSrc="img/apartment-01.jpg"
                  price={120}
                  isBookmarked={false}
                  rating={4}
                  name="Beautiful & luxurious apartment at great location"
                  type="Apartment"
                />
                <PlaceCard
                  isPremium={false}
                  imageSrc="img/room.jpg"
                  price={80}
                  isBookmarked
                  rating={4}
                  name="Wood and stone place"
                  type="Room"
                />
                <PlaceCard
                  isPremium={false}
                  imageSrc="img/apartment-02.jpg"
                  price={132}
                  isBookmarked={false}
                  rating={4}
                  name="Canal View Prinsengracht"
                  type="Apartment"
                />
                <PlaceCard
                  isPremium
                  imageSrc="img/apartment-03.jpg"
                  price={180}
                  isBookmarked={false}
                  rating={5}
                  name="Nice, cozy, warm big bed apartment"
                  type="Apartment"
                />
                <PlaceCard
                  isPremium={false}
                  imageSrc="img/room.jpg"
                  price={80}
                  isBookmarked
                  rating={4}
                  name="Wood and stone place"
                  type="Room"
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
