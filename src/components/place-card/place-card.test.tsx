import { AuthorizationStatus, CardType } from '@const';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeOffer, makeFakeState } from '../../mocks/mocks';
import PlaceCard from './place-card';

describe('Component: PlaceCard', () => {
  const mockOffer = makeFakeOffer();
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  const defaultProps = {
    offer: mockOffer,
    onMouseEnter: mockOnMouseEnter,
    onMouseLeave: mockOnMouseLeave,
    cardType: CardType.Regular,
  };

  const initialState = makeFakeState({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: null,
      userAvatarUrl: null,
    },
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('renders premium badge when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };

    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} offer={premiumOffer} />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('renders correct image size for favorites', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard {...defaultProps} cardType={CardType.Favorites} />
      ),
      initialState
    );

    render(withStoreComponent);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');
  });

  it('renders offer type with capitalized first letter', () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} />),
      initialState
    );

    render(withStoreComponent);

    const type = screen.getByText(
      mockOffer.type[0].toUpperCase() + mockOffer.type.slice(1)
    );
    expect(type).toBeInTheDocument();
  });

  it('renders correct hover handlers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} />),
      initialState
    );

    render(withStoreComponent);

    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);
    expect(mockOnMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(card);
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('shows active bookmark button when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };

    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} offer={favoriteOffer} />),
      initialState
    );

    render(withStoreComponent);

    const bookmarkButton = screen.getByRole('button', {
      name: /in bookmarks/i,
    });
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

});
