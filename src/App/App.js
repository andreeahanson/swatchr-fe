import React, { Component } from "react";
// import Sidebar from '../Sidebar/Sidebar';
// import ColorContainer from '../ColorContainer/ColorContainer';
import { fetchProjects } from "../apiCalls";
import "./App.scss";
const ColorScheme = require("color-scheme");

class App extends Component {
  state = {
    projects: []
  };

  async componentDidMount() {
    const projects = await fetchProjects(
      "http://swatchr-be.herokuapp.com/api/v1/projects"
    );
    this.setState({ projects });
  }

  returnProjectWithPalettes = async id => {
    const projectWithPalettes = await fetch(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
    );
    return projectWithPalettes;
  };

  returnColors = colors => {
    return colors;
  };

  returnRandomHex = () => {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  createScheme = () => {
    let scheme = new ColorScheme();
    const randomColor = this.returnRandomHex()
    scheme.from_hex(randomColor); 
    let colors = [ ...scheme.colors(), randomColor];
    return colors;
  }

  render() {
    return (
      <>
        <h1>App</h1>
        {/* <ColorContainer colors={this.returnColors()}/> */}
        {/* <Sidebar projects={this.state.projects} returnColors={this.returnColors}/> */}
      </>
    );
  }
}

export default App;
