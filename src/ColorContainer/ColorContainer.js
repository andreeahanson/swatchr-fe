import React, { Component } from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

class ColorContainer extends Component {
  state = { 
    colors: []
  }

  static getDerivedStateFromProps(props, state) {
    console.log("PROPS", props.colors)
    console.log("STATE", state.colors)
    if(props.colors !== state.colors) {
      return {
        colors: props.colors
      }
    }
  }

  displayColors = () => {
    return this.state.colors.map(color => {
      if (!color.locked) {
        return <Color hex={color.hex} locked={color.locked} key={color.hex} toggleLockedColor={this.toggleLockedColor}/>;
      }
      return null;
    });
  };

  toggleLockedColor = (colorObj) => {
    const colors = this.state.colors.map(color => {
      if(color.hex === colorObj.hex){
        return {
          hex: colorObj.hex,
          locked: colorObj.locked
        }
      } else {
        return color;
      }
    })
    this.setState({ colors });
  }

  render() {
    return (
      <main className="color-container">
        {this.state.colors && this.displayColors()}
      </main>
    );
  }
};

export default ColorContainer;
