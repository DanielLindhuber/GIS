import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Grid, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import SelectMap from "./SelectMap";
import SelectTable from "./SelectTable";

class Select extends Component {
  getSelectedUser = row => {
    this.props.setSelectSingleUserData(row);
  };

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}>
            <SearchBar callback={this.props.getSelectData} />
            <p />
            <SelectTable
              data={this.props.selectData}
              callback={this.getSelectedUser}
            />
          </Col>
          <Col sm={6} md={9}>
            <SelectMap data={this.props.singleUser} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectData: state.select.selectData,
    singleUser: state.select.singleUser
  };
}

export default connect(
  mapStateToProps,
  actions
)(Select);
