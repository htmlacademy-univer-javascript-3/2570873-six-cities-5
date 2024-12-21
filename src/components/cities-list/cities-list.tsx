import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/action';

type CitiesListProps = {
  cities: {
    name: string;
    id: number;
  }[];
};

const CitiesList = ({ cities }: CitiesListProps): JSX.Element =>{
  const dispatch = useAppDispatch();

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.id}
          className="locations__item"
          onClick={() => handleCityChange(city.name)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default memo(CitiesList);
