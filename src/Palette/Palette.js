import React, { Component } from "react";
import "./Palette.scss";

class Palette extends Component {
  state = {
    name: "",
    displayInput: false,
    hover: false
  };

  displayColors = () => {
    return this.props.colors.map((color, i) => {
      return (
        <div
          key={i}
          className="color-square"
          style={{ backgroundColor: `#${color}` }}
        />
      );
    });
  };

  handleClick = () => {
    this.props.returnColors(this.props.colors);
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  toggleEditName = () => {
    this.setState({ displayInput: !this.state.displayInput });
  };

  handleDelete = async e => {
    e.preventDefault();
    await this.props.deleteFetchPalette(this.props.id);
    this.props.returnProjectWithPalettes(this.props.projectId);
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEdit();
      this.clearForm();
    }
  }

  handleEdit = async () => {
    await this.props.patchFetchPalette(this.state.name, this.props.id);
    this.props.returnProjectWithPalettes(this.props.projectId);
  }

  clearForm = () => {
    this.setState({ name: "" });
  }

  render() {
    return (
      <section className="palette">
        <div className="palette-header">
          <h4>{this.props.name}</h4>
          <button onClick={this.toggleEditName}>Edit</button>
          {this.state.displayInput && <input onKeyDown={this.handleKeyDown} type="text" value={this.state.name} name="name" onChange={this.handleChange} className="edit-palette-input" />}
          <button onClick={this.handleDelete}>X</button>
        </div>
        <div onClick={this.handleClick} className="palette-colors">
          {this.displayColors()}
        </div>
      </section>
    );
  }
}

export default Palette;
