import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Profile from './Profile';

import PrivateRoute from '../shared/components/PrivateRoute';

const NotFound = React.lazy(() => import('../NotFound'));

export default function User() {
  return (
    <Container className="pb-4">
      <Row>
        <Col xs={12}>
          <Switch>
            <PrivateRoute path="/user/profile" component={Profile} exact />
            <Route path="/products/*" component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
