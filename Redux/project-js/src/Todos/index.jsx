/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { selectFilteredTodos, selectedLoadingStat } from '../store/todos/Reducer';
import { setFilter, loadTodos } from '../store/todos/Actions';
import Todo from './Todo';

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector(selectedLoadingStat);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(setFilter(id));
  }, [id]);

  React.useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <Container className="pb-4">
      <Row>
        <Col xs={12}>
          <h2 className="text-center mb-4">Todos</h2>
          {loading ? <Spinner animation="border" variant="primary" /> : todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </Col>
      </Row>
    </Container>
  );
}
