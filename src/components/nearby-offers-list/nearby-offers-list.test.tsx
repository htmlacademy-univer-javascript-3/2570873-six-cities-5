import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeOffers, makeFakeState } from '../../mocks/mocks';
import NearbyOffersList from './nearby-offers-list';

describe('Component: NearbyOffersList', () => {
  const mockOffers = makeFakeOffers(3);

  const initialState = makeFakeState();

  it('renders with offers correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={mockOffers} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);

    const nearPlacesSection = container.querySelector('.near-places');
    const placeCards = container.querySelectorAll('.place-card');

    expect(nearPlacesSection).not.toBeNull();
    expect(placeCards.length).toBe(mockOffers.length);
  });

  it('renders with undefined offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={undefined} />
      ),
      initialState
    );

    render(withStoreComponent);

    const emptyMessage = screen.getByText(/no places in the neighbourhood available/i);
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveStyle({ textAlign: 'center', fontSize: '32px' });
  });

  it('renders with empty offers array', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={[]} />
      ),
      initialState
    );

    render(withStoreComponent);

    const emptyMessage = screen.getByText(/no places in the neighbourhood available/i);
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveStyle({ textAlign: 'center', fontSize: '32px' });
  });
});
