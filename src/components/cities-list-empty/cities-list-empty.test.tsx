import { Cities } from '@const';
import { render, screen } from '@testing-library/react';
import CityPlacesEmpty from './cities-list-empty';

describe('CityPlacesEmpty', () => {
  Cities.forEach((city) => {
    it(`renders the correct message for ${city.name}`, () => {
      render(<CityPlacesEmpty city={city.name} />);

      expect(screen.getByText(`We could not find any property available at the moment in ${city.name}`)).toBeInTheDocument();
      expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    });
  });
});
