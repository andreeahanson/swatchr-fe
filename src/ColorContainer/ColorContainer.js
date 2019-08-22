import React from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

const ColorContainer = props => {
  const displayColors = () => {
    return props.colors.map(color => {
      if (!color.locked) {
        return <Color hex={color.hex} locked={color.locked} key={color.hex}/>;
      }
      return null;
    });
  };
  return (
    <main className="color-container">
      <h2>ColorContainer</h2>
      {displayColors()}
    </main>
  );
};

export default ColorContainer;
