import React, { Component } from "react";
import Palette from "../Palette/Palette";
import "./Sidebar.scss";

class Sidebar extends Component {
  state = {
    selectedProject: "Choose project",
    projects: [],
    addProject: false,
    projectName: "",
    projectSelect: "",
    addPalette: false,
    paletteName: ""
  };

  displayPalettes = () => {
    const { selectedProject, projects } = this.state;
    const currentProject = projects.find(proj => proj.name === selectedProject);
    return currentProject.palettes.map(palette => {
      const { color1, color2, color3, color4, color5, name } = palette;
      const colors = [color1, color2, color3, color4, color5];
      return <Palette colors={colors} name={name} />;
    });
  };

  displayOptions = () => {
    const { projects } = this.state;
    return projects.map((proj, i) => (
      <option key={i} value={proj.name}>
        {proj.name}
      </option>
    ));
  };

  selectProject = e => {
    this.setState({ selectProject: e.target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleInput = e => {
    if (e.target.name === "paletteBtn") {
      this.setState({ addPalette: !this.state.addPalette });
    } else {
      this.setState({ addProject: !this.state.addProject });
    }
  };

  render() {
    return (
      <nav className="sidebar">
        <form className="projects-form">
          <select
            className="projects-select"
            onChange={this.selectProject}
            value={this.state.selectedProject}
          >
            {this.state.projects.length && this.displayOptions()}
          </select>
          <button name="projectBtn" className="add-proj-btn" onClick={this.toggleInput}>
            + Add Project
          </button>
          {this.state.addProject && (
            <input
              name="projectName"
              type="text"
              value={this.state.projectName}
              onChange={this.handleChange}
              className="add-proj-input"
            />
          )}
        </form>
        <form className="palettes-form">
          <buton name="paletteBtn" className="add-palette-btn" onClick={this.toggleInput}>
            + Save palette
          </buton>
          {this.state.addPalette && (
            <input
              name="paletteName"
              type="text"
              value={this.state.paletteName}
              onChange={this.handleChange}
              className="add-palette-input"
            />
          )}
        </form>
        <section className="palettes-section">{this.displayPalettes()}</section>
      </nav>
    );
  }
}

export default Sidebar;
