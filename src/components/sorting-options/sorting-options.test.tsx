import { SortOptions } from '@const';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeState } from '../../mocks/mocks';
import SortingOptions from './sorting-options';

describe('Component: SortingOptions', () => {
  const initialState = makeFakeState({
    APP: {
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.374,
          longitude: 4.889,
          zoom: 12,
        },
      },
      SortOptions: SortOptions.Popular,
      error: null,
    },
  });

  it('should render sorting options correctly and handle interactions', () => {
    const { withStoreComponent, mockStore } = withStore(<SortingOptions />, initialState);
    render(withHistory(withStoreComponent));

    const currentSortType = screen.getByText('Popular', { selector: '.places__sorting-type' });
    expect(currentSortType).toBeInTheDocument();

    fireEvent.click(currentSortType);
    const sortOptionsList = screen.getByRole('list');

    expect(sortOptionsList).toHaveClass('places__options--custom');

    const sortOptions = screen.getAllByRole('listitem');
    expect(sortOptions).toHaveLength(Object.values(SortOptions).length);

    const priceLowToHighOption = screen.getByText('Price: low to high', { selector: '.places__option' });
    fireEvent.click(priceLowToHighOption);

    const actions = mockStore.getActions();
    expect(actions).toEqual([
      {
        type: 'APP/setSortType',
        payload: SortOptions.PriceLowToHigh,
      },
    ]);

    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should close dropdown when a sort option is selected', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <SortingOptions />
      </MemoryRouter>,
      makeFakeState({
        APP: {
          city: {
            name: 'Amsterdam',
            location: {
              latitude: 52.374,
              longitude: 4.889,
              zoom: 12,
            },
          },
          SortOptions: SortOptions.Popular,
          error: null,
        },
      })
    );

    render(withStoreComponent);

    const dropdown = screen.getByText('Popular', { selector: '.places__sorting-type' });
    fireEvent.click(dropdown);

    const newOption = screen.getByText('Price: high to low', { selector: '.places__option' });
    fireEvent.click(newOption);

    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should highlight the active sort option', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <SortingOptions />
      </MemoryRouter>,
      makeFakeState({
        APP: {
          city: {
            name: 'Amsterdam',
            location: {
              latitude: 52.374,
              longitude: 4.889,
              zoom: 12,
            },
          },
          SortOptions: SortOptions.PriceLowToHigh,
          error: null,
        },
      })
    );

    render(withStoreComponent);

    const activeOption = screen.getByText('Price: low to high', { selector: '.places__option--active' });
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should toggle dropdown visibility when clicked', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <SortingOptions />
      </MemoryRouter>,
      makeFakeState({
        APP: {
          city: {
            name: 'Amsterdam',
            location: {
              latitude: 52.374,
              longitude: 4.889,
              zoom: 12,
            },
          },
          SortOptions: SortOptions.Popular,
          error: null,
        },
      })
    );

    render(withStoreComponent);

    const dropdown = screen.getByText('Popular', { selector: '.places__sorting-type' });

    // Open dropdown
    fireEvent.click(dropdown);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    // Close dropdown
    fireEvent.click(dropdown);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});
