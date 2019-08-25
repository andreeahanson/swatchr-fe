import React, { Component } from "react";
import "./AddProjectForm.scss";

class AddProjectForm extends Component {
  state = {
    name: "",
    displayInput: false
  };

  toggleInput = () => {
    this.setState({ displayInput: !this.state.displayInput });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const newProject = { project: { name: this.state.name } };
      this.props.postFetchProject(newProject);
      this.toggleInput();
      this.clearInput();
    }
  };

  clearInput = () => {
    this.setState({
      name: ""
    });
  };

  render() {
    return (
      <div className="sidebar-add-container">
        <img onClick={this.toggleInput} src="./plus.png" alt="plus icon" />
        {!this.state.displayInput && <p>Add project</p>}
        {this.state.displayInput && (
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="input-animation"
            onKeyDown={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default AddProjectForm;
