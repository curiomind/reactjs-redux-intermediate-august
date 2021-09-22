import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function NotAllowed() {
  const location = useLocation();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="auto">
          <h1 className="text-center">Not Allowed</h1>
          <dl className="row">
            <dt className="col-sm-3">Pathname</dt>
            <dd className="col-sm-9">{location.pathname}</dd>
            <dt className="col-sm-3">Search</dt>
            <dd className="col-sm-9">{location.search}</dd>
          </dl>
        </Col>
      </Row>
    </Container>
  );
}
