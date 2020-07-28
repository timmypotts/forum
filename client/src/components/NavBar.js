import React, { useState } from "react";
import { NavLink as RRNavLink, Link } from "react-router-dom";

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [loginStatus, setLoginStatus] = useState()

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar-forum mb-5" color="light" light expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            reactstrap
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/signup"
              activeClassName="active"
              tag={RRNavLink}
            >
              Sign Up
            </NavLink>
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/login"
              activeClassName="active"
              tag={RRNavLink}
            >
              Log In
            </NavLink>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
