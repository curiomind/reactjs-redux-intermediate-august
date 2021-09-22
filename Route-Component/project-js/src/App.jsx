import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PrivateRoute from './shared/components/PrivateRoute';

import Header from './shared/components/Header';
import Dashboard from './Dashboard';

import { onRenderCallback } from './shared/services/profilers';
import { AuthProvider } from './shared/contexts/AuthContext';
import { ProductProvider } from './shared/contexts/ProductContext';

const Authentication = React.lazy(() => import('./Authentication'));
const NotFound = React.lazy(() => import('./NotFound'));
const NotAllowed = React.lazy(() => import('./NotAllowed'));
const User = React.lazy(() => import('./User'));
const Products = React.lazy(() => import('./Products'));

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <React.Profiler id="Header" onRender={onRenderCallback}>
          <Header />
        </React.Profiler>
        <React.Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <Switch>
            <PrivateRoute path="/" component={Dashboard} exact />
            <Route path="/auth" component={Authentication} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/products" component={Products} />
            <Route path="/not-allowed" component={NotAllowed} />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Suspense>
      </ProductProvider>
    </AuthProvider>
  );
}
