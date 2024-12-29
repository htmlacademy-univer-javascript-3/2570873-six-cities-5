import { AppRoute } from '@const';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction, loginAction } from '../../store/api-actions';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validatePassword = (inputPassword: string): boolean => {
    const hasSpaces = inputPassword.includes(' ');
    const hasLetter = /[a-zA-Z]/.test(inputPassword);
    const hasDigit = /\d/.test(inputPassword);

    if (hasSpaces || !hasLetter || !hasDigit) {
      setPasswordError(
        'Password must contain at least one letter, one number, and no spaces.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    void (async () => {
      try {
        await dispatch(loginAction({ login: email, password }));
        await dispatch(fetchOffersAction());
        navigate(AppRoute.Root);
      } catch (error) {
        toast.error('Login failed. Please try again.');
      }
    })();
  };

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label htmlFor="email" className="visually-hidden">
          E-mail
        </label>
        <input
          id="email"
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label htmlFor="password" className="visually-hidden">
          Password
        </label>
        <input
          id="password"
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && (
          <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>
        )}
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!!passwordError}
      >
        Sign in
      </button>
    </form>
  );
}
