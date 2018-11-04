import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      name: ""
    };
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeClass(event) {
    this.setState({ class: event.target.value });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit() {
    this.props.callback(this.state.class, this.state.name);
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Schüler finden</ControlLabel>
            <FormControl
              type="text"
              placeholder="Klasse"
              value={this.state.value}
              onChange={this.handleChangeClass}
            />
            <FormControl
              type="text"
              placeholder="Name"
              value={this.state.value}
              onChange={this.handleChangeName}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <Button onClick={this.handleSubmit}>Suchen</Button>
      </div>
    );
  }
}
