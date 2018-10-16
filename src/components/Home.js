import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import requireAuth from "./requireAuth";
import HereMap from "./HereMap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  componentWillMount() {
    this.props.getUserData();
  }

  renderHelper() {
    if (!this.props.user) {
      return (
        <div>
          <HereMap data={this.state.user} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return this.renderHelper();
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
