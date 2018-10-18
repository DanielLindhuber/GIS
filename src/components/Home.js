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

  componentWillMount() {
    this.props.getUserData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, user: nextProps.user });
  }

  renderHelper() {
    return (
      <div>
        <HereMap user={this.state.user} />
      </div>
    );
  }

  render() {
    return this.renderHelper();
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
