import { AppRoute } from '@const';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { withStore } from '../../mocks/mock-component';
import { makeFakeState } from '../../mocks/mocks';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('renders not found page', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
      makeFakeState()
    );

    render(withStoreComponent);

    // Check if the page structure is correct
    expect(screen.getByRole('heading', { name: /404 - page not found/i })).toBeInTheDocument();
    expect(
      screen.getByText(/oops! the page you are looking for does not exist/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back to home/i })).toHaveAttribute('href', AppRoute.Root);
  });
});
