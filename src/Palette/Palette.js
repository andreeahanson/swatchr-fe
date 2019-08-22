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

  displayEditName = () => {
    this.setState({ displayInput: true });
  };

  render() {
    return (
      <section className="palette">
        <div className="palette-header">
          <h4>{this.props.name}</h4>
          <button onClick={this.displayEditName}>Edit</button>
          <button>X</button>
        </div>
        <div onClick={this.handleClick} className="palette-colors">
          {this.displayColors()}
        </div>
      </section>
    );
  }
}

export default Palette;
