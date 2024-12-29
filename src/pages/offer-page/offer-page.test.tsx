import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe, expect, it } from 'vitest';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeState } from '../../mocks/mocks';
import { State } from '../../types/state';
import { OfferPage } from './offer-page';

const renderWithState = (stateOverrides: Partial<State>) => {
  const mockHistory = createMemoryHistory();
  mockHistory.push('/offer/1');

  const { withStoreComponent } = withStore(
    withHistory(<OfferPage />, mockHistory),
    makeFakeState(stateOverrides)
  );

  return render(withStoreComponent);
};

describe('Component: OfferPage', () => {
  it('renders loading screen when data is loading', () => {
    renderWithState({
      CURRENT_OFFER: {
        offerInfo: null,
        nearbyOffers: [],
        reviews: [],
        isOfferInDetailsDataLoading: true,
      },
    });

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders not found screen when no offer data', () => {
    renderWithState({
      CURRENT_OFFER: {
        offerInfo: null,
        nearbyOffers: [],
        reviews: [],
        isOfferInDetailsDataLoading: false,
      },
    });

    expect(screen.getByText('Offer not found')).toBeInTheDocument();
  });

});
