import { Cities } from '@const';
import { memo, useCallback, useState } from 'react';
import { City } from 'types/city';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/app-data/app-data';

const DEFAULT_CITY = Cities[0];
const ACTIVE_TAB_CLASS = 'tabs__item--active';


const CitiesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [activeCity, setActiveCity] = useState<City>(DEFAULT_CITY);

  const handleCityChange = useCallback(
    (city: City) => {
      setActiveCity(city);
      dispatch(changeCity(city));
    },
    [dispatch]
  );

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li
          key={city.name}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a
            className={`locations__item-link tabs__item ${
              activeCity?.name === city.name ? ACTIVE_TAB_CLASS : ''
            }`}
            href="#"
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
