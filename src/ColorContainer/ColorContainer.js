import React, { Component } from 'react';
import Color from '../Color/Color';
import './ColorContainer.scss';

class ColorContainer extends Component{
  state = {}

  render() {
    return(
      <main>
        <h2>ColorContainer</h2>
        <Color />
      </main>
    )
  }
}

export default ColorContainer;