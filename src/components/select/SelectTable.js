import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../styles/SelectTable.css";

export default class SelectTable extends Component {
  onSelectRow = (row, isSelected, e) => {
    if (isSelected) {
      this.props.callback(row);
    }
  };

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.data}
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
}
