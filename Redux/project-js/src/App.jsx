/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import PrivateRoute from './shared/components/PrivateRoute';
import { ProductProvider } from './shared/contexts/ProductContext';

import Header from './shared/components/Header';
import Dashboard from './Dashboard';

import { onRenderCallback } from './shared/services/profilers';

const Authentication = React.lazy(() => import('./Authentication'));
const NotFound = React.lazy(() => import('./NotFound'));
const NotAllowed = React.lazy(() => import('./NotAllowed'));
const User = React.lazy(() => import('./User'));
const Products = React.lazy(() => import('./Products'));
const Todos = React.lazy(() => import('./Todos'));

export default function App() {
  const { unsubscribe } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (unsubscribe) return unsubscribe;
  }, []);

  return (
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
          <Route path="/todos/:id" component={Todos} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Suspense>
    </ProductProvider>
  );
}
