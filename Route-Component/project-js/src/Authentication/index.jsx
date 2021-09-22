import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

const NotFound = React.lazy(() => import('../NotFound'));

export default function Authentication() {
  return (
    <Container className="pb-4">
      <Row>
        <Col xs={12}>
          <Switch>
            <Route path="/auth/login" component={Login} exact />
            <Route path="/auth/signup" component={Signup} exact />
            <Route path="/auth/*" component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
