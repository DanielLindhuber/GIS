import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import HereMap from "./HereMap";
import HomeTable from "./HomeTable";
import { Grid, Row, Col } from "react-bootstrap";

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
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}>
            <HomeTable />
          </Col>
          <Col sm={6} md={6}>
            <HereMap user={this.state.user} />
          </Col>
          <Col sm={6} md={3} />
        </Row>
      </Grid>
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
