import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';

function RenderList({ products }) {
  if (Array.isArray(products) && products.length === 0) {
    return <h3>No Product found</h3>;
  }
  return (
    <>
      <Row>
        {products &&
          products.map((product) => (
            <Col lg={4} key={product.id}>
              <Card>
                <Card.Header as="h5">{product.name}</Card.Header>
                <Card.Body>
                  <Card.Title>Price: {product.price}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Catagory: {product.catagory}</Card.Subtitle>
                  <Card.Text>{product.description}</Card.Text>
                  <Button as={Link} variant="primary" to={`/products/item/${product.id}`}>
                    View
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">Quantity: {product.quantity}</Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

RenderList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      catagory: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default React.memo(RenderList);
