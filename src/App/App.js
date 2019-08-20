import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ColorContainer from '../ColorContainer/ColorContainer';
import { fetchProjects } from '../apiCalls';
import './App.scss';

class App extends Component {
  state = {
    projects: []
  }

  async componentDidMount() {
    // const projects = await fetchProjects('url')
    //set state with projects
  }

  returnColors = (colors) => {
    //return colors
  }

  render(){
    return (
      <>
      <h1>App</h1>
      <ColorContainer colors={this.returnColors()}/>
      <Sidebar projects={this.state.projects} returnColors={this.returnColors}/>
      </>
    )
  }
}

export default App;
