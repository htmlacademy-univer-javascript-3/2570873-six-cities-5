import Header from '@components/header/header';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="page page--gray page--not-found">
    <Header />
    <main className="page__main page__main--not-found">
      <div className="container">
        <section className="not-found">
          <h1 className="not-found__title">404 - Page Not Found</h1>
          <p className="not-found__description">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <Link to="/" className="button button--primary">
            Go Back to Home
          </Link>
        </section>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
