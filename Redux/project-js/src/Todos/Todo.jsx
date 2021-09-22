import React from 'react';
import { Card } from 'react-bootstrap';

export default function Todo({ todo }) {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Todo Id: {todo.id}</Card.Header>
      <Card.Body>
        <Card.Text>{todo.title}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{`Completed: ${todo.completed}`}</Card.Footer>
    </Card>
  );
}
