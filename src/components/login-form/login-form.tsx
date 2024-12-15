import { AppRoute } from '@const';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction, loginAction } from '../../store/api-actions';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password.includes(' ')) {
      setPasswordError('Password cannot contain spaces');
      return;
    }

    setPasswordError('');

    dispatch(loginAction({ login: email, password })).then(() => {
      dispatch(fetchOffersAction());
      navigate(AppRoute.Root);
    });
  };

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
      </div>
      <button className="login__submit form__submit button" type="submit">
      Sign in
      </button>
    </form>
  );
}

