import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/HeaderStyle.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/heat">
                <NavItem>Übersicht</NavItem>
              </LinkContainer>
              <LinkContainer to="/select">
                <NavItem>Schülerauswahl</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/signout">
                <NavItem>
                  <span className="glyphicon glyphicon-log-in" />
                  Abmelden
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
      /*
      return (
        <nav className="navbar navbar-dark header bg-primary">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/home" className="navbarItem">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/heat" className="navbarItem">
                  Übersicht
                </Link>
              </li>
              <li>
                <a className="navbarItem">Platzhalter</a>
              </li>
              <li>
                <Link to="/signout" className="navbarItem">
                  <span className="glyphicon glyphicon-log-in" />
                  Abmelden
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
      */
    } else {
    }
  }

  render() {
    return <div>{this.renderLinks()}</div>;
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);

// className="header"
