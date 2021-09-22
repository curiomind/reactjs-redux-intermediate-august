/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { signin, getUserProfile } from '../store/auth/Action';

export default function Login() {
  const dispatch = useDispatch();
  const { signinLoading, signinError, user } = useSelector((state) => state.auth);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signin(emailRef.current.value, passwordRef.current.value));
  }

  React.useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
      history.push('/');
    }
  }, [user]);

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {signinError && <Alert variant="danger">{signinError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={signinLoading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/auth/signup">Sign Up</Link>
        </div>
      </Col>
    </Row>
  );
}
