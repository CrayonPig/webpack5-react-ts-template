import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

import '@/styles/reset.css';
import '@cloudscape-design/global-styles/index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename='/'>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
);
