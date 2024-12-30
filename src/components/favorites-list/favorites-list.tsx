import { CardType } from '@const';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Offers } from 'types/offer';
import PlaceCard from '../place-card/place-card';

interface FavoritesListProps {
  cities: string[];
  favorites: Offers;
}

function FavoritesList({ cities, favorites }: FavoritesListProps): JSX.Element {
  const cityFavoritesMap = useMemo(() => cities.reduce<Record<string, Offers>>((acc, city) => {
    acc[city] = favorites.filter((favorite) => favorite.city.name === city);
    return acc;
  }, {}), [cities, favorites]);

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
          <div className="favorites__places">
            {cityFavoritesMap[city]?.map((favorite) => (
              <PlaceCard
                key={favorite.id}
                offer={favorite}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                cardType={CardType.Favorites}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

const MemoizedFavoritesList = memo(FavoritesList);
export default MemoizedFavoritesList;
