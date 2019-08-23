import React from "react";
import Color from "../Color/Color";
import "./ColorContainer.scss";

const ColorContainer = props => {
  console.log(props.colors)
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
      {displayColors()}
    </main>
  );
};

export default ColorContainer;
