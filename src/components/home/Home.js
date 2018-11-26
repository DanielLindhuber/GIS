import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import HereMap from "./HereMap";
import HomeTable from "./HomeTable";
import { Grid, Row, Col } from "react-bootstrap";

class Home extends Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getUserCarpools();
    this.props.getUserDriverCarpools();
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}>
            <HomeTable />
          </Col>
          <Col sm={6} md={6}>
            <HereMap data={{ user: this.props.user.user, target: {} }} />
          </Col>
          <Col sm={6} md={3} />
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  /*
  user
  -------
  carpools: [],
  driverCarpools: [],
  overview: [],
  user: {}
  */
  return { user: state.user };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
