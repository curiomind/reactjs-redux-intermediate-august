/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../shared/contexts/AuthContext';

import { Roles } from '../shared/constants/Roles';

export default function Signup() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const roleRef = React.useRef();

  const { signup, error, loading, currentUser } = useAuth();

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    signup(
      emailRef.current.value,
      passwordRef.current.value,
      passwordConfirmRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value,
      roleRef.current.value
    ).then((res) => {
      if (res) {
        history.push('/');
      }
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      history.push('/');
    }
  }, [currentUser]);

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} placeholder="Email will be your username" required />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} placeholder="Enter Password" required />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Enter Above Password Again" required />
              </Form.Group>
              <Form.Group id="firstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={firstNameRef} placeholder="Enter Your First Name" required />
              </Form.Group>
              <Form.Group id="lastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={lastNameRef} placeholder="Enter Your Last Name" required />
              </Form.Group>
              <Form.Group id="role" className="mb-3">
                <Form.Label>Role</Form.Label>
                <select className="form-control" ref={roleRef} required>
                  <option>Selected Role</option>
                  {Roles.map((role, index) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/auth/login">Log In</Link>
        </div>
      </Col>
    </Row>
  );
}
