import React from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

const ColorContainer = props => {
  const displayColors = () => {
    return props.colors.map(color => {
      return (
        <Color
          hex={color.hex}
          locked={color.locked}
          key={color.id}
          id={color.id}
          toggleLockedColor={props.toggleLockedColor}
        />
      );
    });
  };

    return (
      <main className="color-container">
        {props.colors && displayColors()}
      </main>
    );
}

export default ColorContainer;
