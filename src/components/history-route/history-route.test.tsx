import { AppRoute } from '@const';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe, expect, it } from 'vitest';
import { withHistory } from '../../mocks/mock-component';

describe('Component: HistoryRouter', () => {
  const mockHistory = createMemoryHistory();

  it('renders on root route', () => {
    const component = withHistory(
      <div>Root Page Content</div>,
      mockHistory
    );

    const { container } = render(component);

    expect(container.innerHTML).toContain('Root Page Content');
    expect(mockHistory.location.pathname).toBe(AppRoute.Root);
  });

  it('handles navigation to login', () => {
    const component = withHistory(
      <div>Login Page</div>,
      mockHistory
    );

    render(component);

    const initialPath = mockHistory.location.pathname;
    mockHistory.push(AppRoute.Login);

    expect(mockHistory.location.pathname).not.toBe(initialPath);
    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('handles navigation to favorites', () => {
    const component = withHistory(
      <div>Favorites Page</div>,
      mockHistory
    );

    render(component);

    mockHistory.push(AppRoute.Favorites);
    expect(mockHistory.location.pathname).toBe(AppRoute.Favorites);
  });
});
