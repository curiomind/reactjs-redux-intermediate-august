import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Post({ userId, id, title, body }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Link as={Link} to={`/post/${id}`}>
          Details
        </Card.Link>
        <Card.Link as={Link} to={`/user/${userId}`}>
          User
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
