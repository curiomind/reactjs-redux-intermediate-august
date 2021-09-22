import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Spinner } from 'react-bootstrap';

import './index.scss';
import App from './App';
import ErrorBoundary from './shared/components/ErrorBoundary';

import { Provider } from 'react-redux';
import { configureStore } from './store';

const initialState = {};
export const { store, persistor } = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner animation="border" variant="primary" />} persistor={persistor}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
