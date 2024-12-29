import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeOffers, makeFakeState } from '../../mocks/mocks';
import OffersList from './offers-list';

describe('Component: OffersList', () => {
  const mockOffers = makeFakeOffers(3);

  const initialState = makeFakeState();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders offers list correctly', () => {
    const mockOnActiveOfferChange = () => undefined;
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);
    const offersList = container.querySelector('.cities__places-list');
    const placeCards = container.querySelectorAll('.place-card');

    expect(offersList).not.toBeNull();
    expect(placeCards.length).toBe(mockOffers.length);
  });

  it('renders empty offers list', () => {
    const mockOnActiveOfferChange = vi.fn();
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={[]}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    render(withStoreComponent);

    const placeCards = screen.queryAllByRole('article');
    expect(placeCards).toHaveLength(0);
  });

  it('calls onActiveOfferChange when an offer is hovered', () => {
    const mockOnActiveOfferChange = vi.fn();
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    render(withStoreComponent);

    const firstCard = screen.getAllByRole('article')[0];

    fireEvent.mouseEnter(firstCard);
    expect(mockOnActiveOfferChange).toHaveBeenCalledWith(mockOffers[0].id);

    fireEvent.mouseLeave(firstCard);
    expect(mockOnActiveOfferChange).toHaveBeenCalledWith(null);
  });

  it('handles state updates correctly when hovered', () => {
    const mockOnActiveOfferChange = vi.fn();
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    render(withStoreComponent);

    const firstCard = screen.getAllByRole('article')[0];

    fireEvent.mouseEnter(firstCard);
    const hoveredOffer = mockOffers[0];
    expect(mockOnActiveOfferChange).toHaveBeenCalledWith(hoveredOffer.id);

    fireEvent.mouseLeave(firstCard);
    expect(mockOnActiveOfferChange).toHaveBeenCalledWith(null);
  });
});
