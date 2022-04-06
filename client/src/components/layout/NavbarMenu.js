import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import studyNoteLogo from '../../assets/logo.svg';
import userIcon from '../../assets/person-circle.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="info" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder">
        <img
          src={studyNoteLogo}
          alt="studyNoteLogo"
          width="30"
          height="30"
          className="mr-2 no-select"
        />
        StudyNote
      </Navbar.Brand>

      <NavbarToggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="active" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>

          <Nav.Link className="active" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          <Nav.Link className="active" disabled>
            <img
              src={userIcon}
              alt="userIcon"
              width="28"
              height="28"
              className="mr-2 no-select"
            />
            <span className="mr-2">{username}</span>
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link
            variant="info"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="30"
              height="30"
              className="no-select"

            />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
