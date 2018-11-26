import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";

class Carpool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceCarpools: []
    };
    this.getDistanceCarpools = this.getDistanceCarpools.bind(this);
  }

  componentDidMount() {
    this.getDistanceCarpools(10);
  }

  getDistanceCarpools(distance) {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3090/carpool/get?distance=" + distance, {
        headers: { authorization: token }
      })
      .then(res => this.setState({ distanceCarpools: res.data }));
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}>
            Platzhalter
          </Col>
          <Col sm={6} md={3}>
            Platzhaler
          </Col>
          <Col sm={6} md={6}>
            Map Platzhaler
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(
  mapStateToProps,
  actions
)(Carpool);
