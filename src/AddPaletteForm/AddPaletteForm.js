import React, { Component } from "react";
import "./AddPaletteForm.scss";

class AddPaletteForm extends Component {
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
      const id = this.props.currentProjectId;
      const newPalette = {
        palette: {
          name: this.state.name,
          project_id: id,
          color1: this.props.colors[0].hex,
          color2: this.props.colors[1].hex,
          color3: this.props.colors[2].hex,
          color4: this.props.colors[3].hex,
          color5: this.props.colors[4].hex
        }
      };
      this.props.postFetchPalette(newPalette, id);
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
        <img
          onClick={this.toggleInput}
          src="./save.png"
          alt="save icon"
        />
        {!this.state.displayInput && <p>Save palette</p>}
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

export default AddPaletteForm;
