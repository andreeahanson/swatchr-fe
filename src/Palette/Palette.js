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
          style={{ "backgroundColor": `#${color}` }}
        />
      );
    });
  };

  handleClick = () => {
    this.props.returnColors(this.props.colors)
  }

  render() {
    return (
      <section className="palette" onClick={this.handleClick}>
        <div className="palette-header">
          <h4>{this.props.name}</h4>
          <button>Edit</button>
          <button>X</button>
        </div>
        <div className="palette-colors">{this.displayColors()}</div>
      </section>
    );
  }
}

export default Palette;
