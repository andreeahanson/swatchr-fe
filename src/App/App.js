import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ColorContainer from "../ColorContainer/ColorContainer";
import {
  fetchProjects,
  fetchOneProject,
  postProject,
  postPalette,
  deletePalette,
  deleteProject,
  patchPalette,
  patchProject
} from "../apiCalls";
import "./App.scss";
const ColorScheme = require("color-scheme");

class App extends Component {
  state = {
    projects: [],
    colors: [],
    schemeHover: false,
    currentProject: {}
  };

  async componentDidMount() {
    this.state.colors.length === 0 && this.createScheme();
    const rawProjects = await fetchProjects(
      "http://swatchr-be.herokuapp.com/api/v1/projects"
    );
    const projects = this.cleanProjects(rawProjects);
    this.setState({ projects });
  }

  cleanProjects = projects => {
    return projects.map(project => {
      return {
        id: project.id,
        name: project.name
      };
    });
  };

  returnProjectWithPalettes = async id => {
    const rawProjects = await fetchProjects(
      "http://swatchr-be.herokuapp.com/api/v1/projects"
    );
    const projects = this.cleanProjects(rawProjects);
    if (id === -1) {
      this.setState({ projects, currentProject: {} });
    } else {
      const currentProject = await fetchOneProject(
        `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
      );
      this.setState({ projects, currentProject })
    }
  };

  deleteFetchPalette = async id => {
    await deletePalette(
      `http://swatchr-be.herokuapp.com/api/v1/palettes/${id}`
    );
  };

  deleteFetchProject = async id => {
    await deleteProject(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
    );
  };

  patchFetchPalette = async (name, id) => {
    await patchPalette(
      `http://swatchr-be.herokuapp.com/api/v1/palettes/${id}`,
      { name }
    );
  };

  patchFetchProject = async (name, id) => {
    await patchProject(
      `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`,
      { name }
    );
  };

  postFetchProject = async newProject => {
      const newProjectId = await postProject(
        "http://swatchr-be.herokuapp.com/api/v1/projects",
        newProject
      );
      const project = {
        id: newProjectId.id[0],
        name: newProject.project.name
      };
      const projects = [
        ...this.state.projects,
        project
      ];
      this.returnProjectWithPalettes(newProjectId.id[0]);
      this.setState({ projects });
  }

  postFetchPalette = async (newPalette, project) => {
      await postPalette(
        `http://swatchr-be.herokuapp.com/api/v1/projects/${project.id}/palettes`,
        newPalette
      );
      this.returnProjectWithPalettes(project.id);
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
  };

  handleClick = e => {
    e.preventDefault();
    this.createScheme();
  };

  onMouseOver = () => {
    this.setState({ schemeHover: true });
  };

  onMouseOut = () => {
    this.setState({ schemeHover: false });
  };

  render() {
    return (
      <main className="app">
        <header className="app-header">
          <h1>Swatchr</h1>
          <div
            className="generate-scheme"
            onClick={this.handleClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          >
            Generate scheme
            {this.state.schemeHover && (
              <img src="./down.png" alt="down arrow" />
            )}
          </div>
        </header>
        <div className="colors-sidebar-wrapper">
          <ColorContainer
            toggleLockedColor={this.toggleLockedColor}
            colors={this.state.colors}
          />
          {this.state.projects.length > 0 && (
            <Sidebar
              projects={this.state.projects}
              returnColors={this.returnColors}
              returnProjectWithPalettes={this.returnProjectWithPalettes}
              postFetchProject={this.postFetchProject}
              postFetchPalette={this.postFetchPalette}
              colors={this.state.colors}
              deleteFetchPalette={this.deleteFetchPalette}
              patchFetchPalette={this.patchFetchPalette}
              deleteFetchProject={this.deleteFetchProject}
              patchFetchProject={this.patchFetchProject}
              currentProject={this.state.currentProject}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
