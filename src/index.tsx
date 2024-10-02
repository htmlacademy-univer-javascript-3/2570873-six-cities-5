import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App places={312} />
  </React.StrictMode>
);
