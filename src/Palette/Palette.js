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
          className={`color-square color${i + 1}`}
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
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEdit();
      this.toggleEditName();
      this.clearForm();
    }
  };

  handleEdit = async () => {
    await this.props.patchFetchPalette(this.state.name, this.props.id);
    this.props.returnProjectWithPalettes(this.props.projectId);
  };

  clearForm = () => {
    this.setState({ name: "" });
  };

  displayButtons = () => {
    this.setState({ hover: true });
  };

  hideButtons = () => {
    this.setState({ hover: false });
  };

  render() {
    return (
      <section
        onMouseOver={this.displayButtons}
        onMouseLeave={this.hideButtons}
        className="palette"
      >
        <div className="palette-header">
          {!this.state.displayInput && <h4>{this.props.name}</h4>}
          {this.state.displayInput && (
            <input
              onKeyDown={this.handleKeyDown}
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              className="edit-palette-input"
            />
          )}
          {this.state.hover && (
            <div>
              <img
                src="./edit.png"
                alt="edit icon"
                onClick={this.toggleEditName}
              />
              <img
                src="./close.png"
                alt="close icon"
                onClick={this.handleDelete}
              />
            </div>
          )}
        </div>
        <div onClick={this.handleClick} className="palette-colors">
          {this.displayColors()}
        </div>
      </section>
    );
  }
}

export default Palette;
