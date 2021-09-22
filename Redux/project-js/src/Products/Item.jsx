/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';

import { useProduct } from '../shared/contexts/ProductContext';
import { Catagories } from '../shared/constants/Catagories';

export default function Item() {
  const { slug } = useParams();
  const { product, getProduct, error, loading } = useProduct();
  const { isManager } = useSelector((state) => state.auth);

  function handleSubmit(e) {
    e.preventDefault();
  }

  React.useEffect(() => {
    getProduct(slug);
  }, [slug]);

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row className="justify-content-center">
          <Col lg={4}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Product</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" disabled value={product.name ?? ''} />
                  </Form.Group>
                  <Form.Group id="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" disabled value={product.description ?? ''} />
                  </Form.Group>
                  <Form.Group id="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" disabled value={product.price ?? ''} />
                  </Form.Group>
                  <Form.Group id="quantity" className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" disabled value={product.quantity ?? ''} />
                  </Form.Group>
                  <Form.Group id="catagory" className="mb-3">
                    <Form.Label>Catagory</Form.Label>
                    <select className="form-control" defaultValue={product.catagory} disabled>
                      <option value={'default'}>Selected Catagory</option>
                      {Catagories.map((catagory) => (
                        <option key={catagory.id} value={catagory.id}>
                          {catagory.name}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                  <Button disabled={loading || !isManager} className="w-100" type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
