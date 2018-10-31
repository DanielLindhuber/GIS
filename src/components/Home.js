import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <HereMap user={this.state.user} />
          </div>
          <div className="col-md-4">Platzhalter</div>
        </div>
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
// <HereMap user={this.state.user} />
