import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ColorContainer from '../ColorContainer/ColorContainer';
import './App.scss';

class App extends Component {
  state = {}

  render(){
    return (
      <>
      <h1>App</h1>
      <ColorContainer />
      <Sidebar />
      </>
    )
  }
}

export default App;
