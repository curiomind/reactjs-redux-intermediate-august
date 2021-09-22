import React from 'react';

import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useProduct } from '../shared/contexts/ProductContext';

export default function Dashboard() {
  const { numberOfProducts, numberOfCategories, tolalProductQuantity, tolalProductValue, loading } = useProduct();

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Container className="pb-4">
          <Row>
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Products</Card.Title>
                  <Card.Text>
                    <strong>{numberOfProducts}</strong> in <strong>{numberOfCategories}</strong> categories
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Products Quantity</Card.Title>
                  <Card.Text>
                    <strong>{tolalProductQuantity}</strong> product of value <strong>{tolalProductValue}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
