import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import { signout } from '../../store/auth/Action';
import { selectHeader } from '../../store/auth/Reducer';

function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { initials, user, isManager } = useSelector(selectHeader);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(signout());
  }

  function AddProductMenu(manager) {
    if (manager) {
      return (
        <NavDropdown.Item as={NavLink} to="/products/add" activeClassName="active">
          Add
        </NavDropdown.Item>
      );
    }
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="React Private Routes, Error Boundaries, Profiler, PropTypes, Accessibility"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="hooks-react-bootstrap">
          <Nav className="me-auto">
            {user ? (
              <NavDropdown title="Products" id="pureDropdown" active={pathname.startsWith('/products')}>
                <NavDropdown.Item as={NavLink} to="/products/list" activeClassName="active">
                  List
                </NavDropdown.Item>
                {AddProductMenu(isManager)}
              </NavDropdown>
            ) : null}
            <NavDropdown title="Todos" id="todoDropDown" active={pathname.startsWith('/todos')}>
              <NavDropdown.Item as={NavLink} to="/todos/all" activeClassName="active">
                All
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/todos/completed" activeClassName="active">
                Completed
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/todos/pending" activeClassName="active">
                Pending
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown drop="right" title={initials} id="profileDropDown" className="profile" active={pathname.startsWith('/user')}>
                <NavDropdown.Item as={NavLink} to="/user/profile" activeClassName="active">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/auth/logout" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/auth/login">
                LOG IN
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'WDYR-Header',
};

export default React.memo(Header);
