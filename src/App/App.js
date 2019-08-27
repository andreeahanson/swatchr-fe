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
const uuidv1 = require("uuid/v1");

class App extends Component {
  state = {
    projects: [],
    colors: [],
    schemeHover: false,
    currentProject: {},
    error: ''
  };

  async componentDidMount() {
    this.state.colors.length === 0 && this.createScheme();
    const rawProjects = await fetchProjects(
      "http://swatchr-be.herokuapp.com/api/v1/projects"
    );
    rawProjects.reverse();
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
    try {
      const rawProjects = await fetchProjects(
        "http://swatchr-be.herokuapp.com/api/v1/projects"
      );
      const projects = this.cleanProjects(rawProjects);
      projects.reverse();
      if (id === -1) {
        this.setState({ projects, currentProject: {} });
      } else {
        const currentProject = await fetchOneProject(
          `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
        );
        currentProject.palettes.reverse();
        this.setState({ projects, currentProject });
      }
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  deleteFetchPalette = async id => {
    try{
      await deletePalette(
        `http://swatchr-be.herokuapp.com/api/v1/palettes/${id}`
      );
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  deleteFetchProject = async id => {
    try {
      await deleteProject(
        `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`
      );
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  patchFetchPalette = async (name, id) => {
    try {
      await patchPalette(
        `http://swatchr-be.herokuapp.com/api/v1/palettes/${id}`,
        { name }
      );
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  patchFetchProject = async (name, id) => {
    try {
      await patchProject(
        `http://swatchr-be.herokuapp.com/api/v1/projects/${id}`,
        { name }
      );
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  postFetchProject = async newProject => {
    try {
      const newProjectId = await postProject(
        "http://swatchr-be.herokuapp.com/api/v1/projects",
        newProject
      );
      const project = {
        id: newProjectId.id[0],
        name: newProject.project.name
      };
      const projects = [ project, ...this.state.projects ];
      this.returnProjectWithPalettes(newProjectId.id[0]);
      this.setState({ projects });
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  postFetchPalette = async (newPalette, project) => {
    try {
      await postPalette(
        `http://swatchr-be.herokuapp.com/api/v1/projects/${project.id}/palettes`,
        newPalette
      );
      this.returnProjectWithPalettes(project.id);
    } catch (error) {
      this.setState({ error : error.message })
    }
  };

  cleanColors = colors => {
    return colors.map(color => {
      return {
        hex: color.toUpperCase(),
        locked: false,
        id: uuidv1()
      };
    });
  };

  returnColors = rawColors => {
    const colors = this.cleanColors(rawColors);
    this.setState({ colors });
  };

  toggleLockedColor = colorObj => {
    const colors = this.state.colors.map(color => {
      if (color.id === colorObj.id) {
        return {
          hex: colorObj.hex,
          locked: colorObj.locked,
          id: colorObj.id
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
    const rawColors = [...scheme.colors(), randomColor];
    const newColors = this.cleanColors(rawColors);
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

  handleClick = () => {
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
          <h1>Swatchr<img src="./paint.png" alt="paint brush icon"/></h1>
          <div className="generate-scheme" onClick={this.handleClick}>
            <p onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
              Generate scheme
            </p>
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
