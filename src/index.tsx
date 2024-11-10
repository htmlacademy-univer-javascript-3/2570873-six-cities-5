import { reviews } from '@mocks/reviews.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import { offersInDetails } from './mocks/offer-details.ts';
import { offers } from './mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      places={offers.length}
      offers={offers}
      offersInDetails={offersInDetails}
      reviews={reviews}
    />
  </React.StrictMode>
);
