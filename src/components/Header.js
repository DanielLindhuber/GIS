import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/HeaderStyle.css";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
          <Link to="/signout" className="btn btn-primary">
            Sign Out
          </Link>
        </div>
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
