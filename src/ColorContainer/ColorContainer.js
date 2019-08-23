import React, { Component } from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

class ColorContainer extends Component {
  displayColors = () => {
    return this.props.colors.map(color => {
      return (
        <Color
          hex={color.hex}
          locked={color.locked}
          key={color.hex}
          toggleLockedColor={this.props.toggleLockedColor}
        />
      );
    });
  };

  render() {
    return (
      <main className="color-container">
        {this.props.colors && this.displayColors()}
      </main>
    );
  }
}

export default ColorContainer;
