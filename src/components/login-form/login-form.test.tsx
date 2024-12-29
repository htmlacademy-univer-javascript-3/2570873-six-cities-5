import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from './login-form';

const mockStore = configureStore([thunk]);
const mockDispatch = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('Component: LoginForm', () => {
  it('renders login form correctly', () => {
    const store = mockStore({});
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <LoginForm />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays an error if password contains spaces', () => {
    const store = mockStore({});
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <LoginForm />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass word' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/password must contain at least one letter, one number, and no spaces./i)).toBeInTheDocument();
  });

  it('submits the form correctly with valid data', () => {
    const store = mockStore({});
    const history = createMemoryHistory();

    mockDispatch.mockResolvedValueOnce(Promise.resolve());

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <LoginForm />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
