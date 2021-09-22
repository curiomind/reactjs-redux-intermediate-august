import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

import { Roles } from '../shared/constants/Roles';

export default function Profile() {
  const { profile, profileError } = useSelector((state) => state.auth);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">User Profile</h2>
            {profileError && <Alert variant="danger">{profileError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" disabled value={profile.email} />
              </Form.Group>
              <Form.Group id="firstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" disabled value={profile.firstName} />
              </Form.Group>
              <Form.Group id="lastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" disabled value={profile.lastName} />
              </Form.Group>
              <Form.Group id="role" className="mb-3">
                <Form.Label>Role</Form.Label>
                <select className="form-control" disabled>
                  <option>Selected Role</option>
                  {Roles.map((role) => (
                    <option key={role.id} value={role.id} selected={role.id === profile.role}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Button disabled={true} className="w-100" type="submit">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
