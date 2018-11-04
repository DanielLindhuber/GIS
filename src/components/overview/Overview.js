import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import HeatMap from "./HeatMap";

class Overview extends Component {
  componentDidMount() {
    this.props.getOverviewData();
  }

  render() {
    console.log(this.props.overview);
    return (
      <div>
        <HeatMap data={this.props.overview} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { overview: state.user.overview };
}

export default connect(
  mapStateToProps,
  actions
)(Overview);
