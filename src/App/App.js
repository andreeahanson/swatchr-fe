import React, { Component } from "react";
import Sidebar from '../Sidebar/Sidebar';
import ColorContainer from '../ColorContainer/ColorContainer';
import { fetchProjects, fetchOneProject } from "../apiCalls";
import "./App.scss";
const ColorScheme = require("color-scheme");

class App extends Component {
  state = {
    projects: [],
    colors: []
  };

  async componentDidMount() {
    this.state.colors.length === 0 && this.createScheme();
    const projects = await fetchProjects(
      "http://swatchr-be.herokuapp.com/api/v1/projects"
    );
    this.setState({ projects });
  }

  returnProjectWithPalettes = async id => {
    console.log(id)
    const projectWithPalettes = await fetchOneProject(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
    );
    console.log(projectWithPalettes)
    return projectWithPalettes;
  };

  returnColors = colors => {
    this.setState({ colors });
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
    let rawColors = [ ...scheme.colors(), randomColor];
    let colors = rawColors.map(color => {
      return {
        hex: color,
        locked: false
      }
    })
    this.setState({ colors });
  }

  render() {
    return (
      <>
        <h1>App</h1>
        <ColorContainer colors={this.state.colors}/>
        {this.state.projects.length > 0 && <Sidebar projects={this.state.projects} returnColors={this.returnColors} returnProjectWithPalettes={this.returnProjectWithPalettes}/>}
      </>
    );
  }
}

export default App;
