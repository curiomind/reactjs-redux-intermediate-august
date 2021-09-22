/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Roles } from '../shared/constants/Roles';
import { signup, verifyAuthAndGetUserProfile } from '../store/auth/Action';

export default function Signup() {
  const dispatch = useDispatch();

  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const roleRef = React.useRef();

  const { signupError, signupLoading, user } = useSelector((state) => state.auth);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      signup(
        emailRef.current.value,
        passwordRef.current.value,
        passwordConfirmRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        roleRef.current.value
      )
    );
  }

  React.useEffect(() => {
    if (user) {
      dispatch(verifyAuthAndGetUserProfile());
      console.log(user);
      history.push('/');
    }
  }, [user]);

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {signupError && <Alert variant="danger">{signupError}</Alert>}
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
                  {Roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Button disabled={signupLoading} className="w-100" type="submit">
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
