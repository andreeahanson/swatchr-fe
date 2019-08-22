import React, { Component } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
// import ColorContainer from '../ColorContainer/ColorContainer';
import { fetchProjects } from '../apiCalls';
import './App.scss';

class App extends Component {
  state = {
    projects: []
  }

  async componentDidMount() {
    const projects = await fetchProjects('http://swatchr-be.herokuapp.com/api/v1/projects');
    this.setState({ projects })
    console.log(this.state.projects)
    // set state with projects
  }

  returnProjectWithPalettes = async id => {
    const projectWithPalettes = await fetch(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
    );
    return projectWithPalettes;
  }

  returnColors = (colors) => {
    //return colors
  }

  render(){
    return (
      <>
      <h1>App</h1>
      {/* <ColorContainer colors={this.returnColors()}/> */}
      {/* <Sidebar projects={this.state.projects} returnColors={this.returnColors}/> */}
      </>
    )
  }
}

export default App;
