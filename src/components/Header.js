import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/HeaderStyle.css";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
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
    } else {
    }
  }

  render() {
    return <div className="header">{this.renderLinks()}</div>;
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
