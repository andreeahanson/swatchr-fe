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
      const id = this.props.currentProjectId;
      const payload = {
        [this.props.keyName]: {
          name: this.state.name,
          project_id: id,
          color1: this.props.colors[0].hex,
          color2: this.props.colors[1].hex,
          color3: this.props.colors[2].hex,
          color4: this.props.colors[3].hex,
          color5: this.props.colors[4].hex
        }
      };
      this.props.postFetch(payload, id);
      this.clearInput();
    } 
  }

  clearInput = () => {
    this.setState({
      name: ""
    })
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
