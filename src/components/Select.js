import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import axios from "axios";
import SelectMap from "./SelectMap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./styles/Select.css";

export default class myClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {}
    };
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  getSearchTerm(className, name) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3090/select?class=${className}&name=${name}`, {
        headers: { authorization: token }
      })
      .then(response => this.setState({ users: response.data }));
  }

  renderTable() {
    return (
      <div>
        <BootstrapTable
          data={this.state.users}
          selectRow={{
            mode: "radio",
            clickToSelect: true,
            unselectable: [2],
            selected: [1],
            onSelect: this.onSelectRow,
            bgColor: "gold"
          }}
        >
          <TableHeaderColumn isKey dataField="name">
            Name
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

  onSelectRow(row, isSelected, e) {
    if (isSelected) {
      this.setState({ user: row });
    }
  }

  renderMap() {
    return <SelectMap user={this.state.user} />;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={3}>
            <SearchBar callback={this.getSearchTerm} />
            <p />
            {this.renderTable()}
          </Col>
          <Col sm={6} md={9}>
            {this.renderMap()}
          </Col>
        </Row>
      </Grid>
    );
  }
}
