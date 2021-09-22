import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../shared/components/PrivateRoute';
import { useAuth } from '../shared/contexts/AuthContext';

import List from './List';
import Item from './Item';
import Add from './Add';

const NotFound = React.lazy(() => import('../NotFound'));

export default function Products() {
  const { isManager } = useAuth();

  return (
    <Container className="pb-4">
      <Row>
        <Col xs={12}>
          <Switch>
            <PrivateRoute path="/products/list" component={List} exact />
            <PrivateRoute path="/products/item/:slug" component={Item} exact />
            <PrivateRoute forManager={isManager} path="/products/add" component={Add} exact />
            <Route path="/products/*" component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
