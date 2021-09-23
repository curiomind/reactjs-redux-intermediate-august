/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import Posts from './Posts';

export default function App() {
  return (
    <React.Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <Switch>
        <Route path="/posts" component={Posts} />
        <Redirect from="/" to="/posts" />
      </Switch>
    </React.Suspense>
  );
}
