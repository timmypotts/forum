import React, { useState, useContext } from "react";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import { UserContext } from "../context/UserContext";
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

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar className="navbar-forum mb-5" color="light" light expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">
          working-title
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {user ? (
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/userdashboard"
              activeClassName="active"
              tag={RRNavLink}
            >
              {user}
            </NavLink>
          ) : (
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/signup"
              activeClassName="active"
              tag={RRNavLink}
            >
              Register
            </NavLink>
          )}

          {user ? (
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/"
              activeClassName="active"
              tag={RRNavLink}
              onClick={() => {
                AuthService.logout();
                setUser(null);
              }}
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink
              className="rightNav"
              style={{ color: "grey" }}
              to="/login"
              activeClassName="active"
              tag={RRNavLink}
            >
              Log In
            </NavLink>
          )}
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
