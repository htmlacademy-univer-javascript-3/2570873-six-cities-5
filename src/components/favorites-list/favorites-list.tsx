import { CardType } from '@const';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Offers } from 'types/offer';
import PlaceCard from '../../components/place-card/place-card';

interface FavoritesListProps {
  cities: string[];
  favorites: Offers;
}

function FavoritesList({ cities, favorites }: FavoritesListProps): JSX.Element {
  const renderCityFavorites = useCallback(
    (city: string) =>
      favorites
        .filter((favorite) => favorite.city.name === city)
        .map((favorite) => (
          <PlaceCard
            key={favorite.id}
            offer={favorite}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            cardType={CardType.Favorites}
          />
        )),
    [favorites]
  );

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`#${city}`}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">{renderCityFavorites(city)}</div>
        </li>
      ))}
    </ul>
  );
}

const MemoizedFavoritesList = memo(FavoritesList);
export default MemoizedFavoritesList;
