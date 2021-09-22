/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

import { useProduct } from '../shared/contexts/ProductContext';
import { Catagories } from '../shared/constants/Catagories';

export default function Add() {
  const history = useHistory();
  const { isManager } = useSelector((state) => state.auth);
  const { addProduct, error, loading } = useProduct();

  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const priceRef = React.useRef();
  const quantityRef = React.useRef();
  const catagoryRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    addProduct(
      nameRef.current.value,
      descriptionRef.current.value,
      priceRef.current.value,
      catagoryRef.current.value,
      quantityRef.current.value
    ).then((res) => {
      history.push('/products/list');
    });
  }

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Add Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} placeholder="Enter Product Name" required />
              </Form.Group>
              <Form.Group id="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" ref={descriptionRef} placeholder="Enter Product Description" required />
              </Form.Group>
              <Form.Group id="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" ref={priceRef} placeholder="Enter Product Price" required />
              </Form.Group>
              <Form.Group id="quantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text" ref={quantityRef} placeholder="Enter Product Quantity" required />
              </Form.Group>
              <Form.Group id="catagory" className="mb-3">
                <Form.Label>Catagory</Form.Label>
                <select className="form-control" ref={catagoryRef} required>
                  <option>Selected Catagory</option>
                  {Catagories.map((catagory) => (
                    <option key={catagory.id} value={catagory.id}>
                      {catagory.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Button disabled={loading && !isManager} className="w-100" type="submit">
                Add
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
