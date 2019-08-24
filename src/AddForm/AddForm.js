import React, { Component } from "react";
import "./AddForm.scss";

class AddForm extends Component {
  state = {
    name: "",
    displayInput: false
  };

  toggleInput = () => {
    this.setState({ displayInput: !this.state.displayInput });
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = e => {
    if(e.keyCode === 13) {
      e.preventDefault();
      this.props.postFetch()
    } 

  }

  render() {
    return (
      <div
        className="sidebar-add-container"
        >
        <img
          onClick={this.toggleInput}
          src={this.props.imagePath}
          alt={this.props.imageAlt}
        />
        {!this.state.displayInput && <p>{this.props.label}</p>}
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

export default AddForm;
