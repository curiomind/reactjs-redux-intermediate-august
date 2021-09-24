import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Post as SinglePost } from '../models';

export default function Post({ userId, id, title, body }: SinglePost): JSX.Element {
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
