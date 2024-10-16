import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

const FavoritesPage: React.FC = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <PlaceCard
                  isPremium
                  imageSrc="img/apartment-small-03.jpg"
                  price={180}
                  isBookmarked
                  rating={5}
                  name="Nice, cozy, warm big bed apartment"
                  type="Apartment"
                />
                <PlaceCard
                  imageSrc="img/room-small.jpg"
                  price={80}
                  isBookmarked
                  rating={4}
                  name="Wood and stone place"
                  type="Room"
                />
              </div>
            </li>
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Cologne</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <PlaceCard
                  imageSrc="img/apartment-small-04.jpg"
                  price={180}
                  isBookmarked
                  rating={5}
                  name="White castle"
                  type="Apartment"
                />
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default FavoritesPage;
