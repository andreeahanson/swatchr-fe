import React, { Component } from 'react';
import Palette from '../Palette/Palette';
import './Sidebar.scss';

class Sidebar extends Component{
  state = {}

  render(){
    return (
      <nav>
        <h3>Sidebar</h3>
        <Palette />
      </nav>
    )
  }
}

export default Sidebar;