import { Cities } from '@const';
import { fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { changeCity } from '../../store/app-data/app-data';
import MemoizedCitiesList from './cities-list';

describe('CitiesList Component', () => {
  it('should render cities list and handle city change', () => {
    const { withStoreComponent } = withStore(withHistory(<MemoizedCitiesList />));

    render(withStoreComponent);

    Cities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });

    const parisLink = screen.getByText('Paris').closest('a');
    if (parisLink) {
      fireEvent.click(parisLink);
      expect(parisLink).toHaveClass('tabs__item--active');
    } else {
      throw new Error('City link not found');
    }
  });

  it('should dispatch the correct action on city change', () => {
    const { withStoreComponent, mockStore } = withStore(withHistory(<MemoizedCitiesList />));

    render(withStoreComponent);

    const amsterdamCity = Cities.find((city) => city.name === 'Amsterdam');
    if (!amsterdamCity) {
      throw new Error('Amsterdam city not found in mock data');
    }

    const amsterdamLink = screen.getByText('Amsterdam').closest('a');
    if (amsterdamLink) {
      fireEvent.click(amsterdamLink);

      const actions = mockStore.getActions();
      expect(actions).toContainEqual(changeCity(amsterdamCity));
    } else {
      throw new Error('City link not found');
    }
  });
});
