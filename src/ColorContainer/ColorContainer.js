import React, { Component } from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

class ColorContainer extends Component {
  state = { 
    colors: []
  }

  static getDerivedStateFromProps(props, state) {
    if(props.colors !== state.colors) {
      return {
        colors: props.colors
      }
    }
  }

  displayColors = () => {
    return this.state.colors.map(color => {
      if (!color.locked) {
        return <Color hex={color.hex} locked={color.locked} key={color.hex}/>;
      }
      return null;
    });
  };

  render() {
    return (
      <main className="color-container">
        {this.props.colors && this.displayColors()}
      </main>
    );
  }
};

export default ColorContainer;
