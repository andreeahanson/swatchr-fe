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
    const projectWithPalettes = await fetchOneProject(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
    );
    return projectWithPalettes;
  };

  cleanColors = colors => {
    return colors.map(color => {
      return {
        hex: color.toUpperCase(),
        locked: false
      };
    });
  };

  returnColors = rawColors => {
    const colors = this.cleanColors(rawColors);
    this.setState({ colors });
  };

  toggleLockedColor = colorObj => {
    const colors = this.state.colors.map(color => {
      if (color.hex === colorObj.hex) {
        return {
          hex: colorObj.hex,
          locked: colorObj.locked
        };
      } else {
        return color;
      }
    });
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
    const randomColor = this.returnRandomHex();
    scheme.from_hex(randomColor);
    let rawColors = [...scheme.colors(), randomColor];
    let newColors = this.cleanColors(rawColors);
    if (this.state.colors.length) {
      const colors = this.mapLockedColors(newColors);
      this.setState({ colors });
    } else {
      const colors = newColors;
      this.setState({ colors });
    }
  };

  mapLockedColors = newColors => {
    return newColors.map((newColor, index) => {
      const oldColor = this.state.colors[index];
      if (oldColor.locked) {
        return oldColor;
      } else {
        return newColor;
      }
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.createScheme();
  };

  render() {
    return (
      <main className="app">
        <header className="app-header">
          <h1>Swatchr</h1>
          <button onClick={this.handleClick}>Generate Scheme >></button>
        </header>
        <div className="colors-sidebar-wrapper">
          <ColorContainer toggleLockedColor={this.toggleLockedColor} colors={this.state.colors} />
          {this.state.projects.length > 0 && (
            <Sidebar
              projects={this.state.projects}
              returnColors={this.returnColors}
              returnProjectWithPalettes={this.returnProjectWithPalettes}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
