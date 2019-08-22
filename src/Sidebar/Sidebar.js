import React, { Component } from "react";
import Palette from "../Palette/Palette";
import "./Sidebar.scss";

class Sidebar extends Component {
  state = {
    selectedProject: "",
    addProject: false,
    projectName: "",
    projectSelect: "",
    addPalette: false,
    paletteName: "",
    currentProject: {}
  };

  displayPalettes = () => {
    return this.state.currentProject.palettes.map((palette, i) => {
      const { color1, color2, color3, color4, color5, name } = palette;
      const colors = [color1, color2, color3, color4, color5];
      return <Palette key={i} colors={colors} name={name} returnColors={this.props.returnColors} />;
    });
  };

  displayOptions = () => {
    const { projects } = this.props;
    return projects.map((proj, i) => (
      <option id={proj.id} key={i} value={proj.name}>
        {proj.name}
      </option>
    ));
  };
  
  selectProject = async e => {
    const projectId = parseInt(e.nativeEvent.target.selectedOptions[0].id);
    const projectValue = e.nativeEvent.target.selectedOptions[0].value;
    let currentProject;
    if(projectId === 0) {
      currentProject = {}
    } else {
      currentProject = await this.props.returnProjectWithPalettes(projectId);
    }
    this.setState({
      selectedProject: projectValue,
      currentProject
    });
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
            <option
            value='Select Project'
            id={0}
            >Select Project</option>
            {this.props.projects.length && this.displayOptions()}
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
          <button name="paletteBtn" className="add-palette-btn" onClick={this.toggleInput}>
            + Save palette
          </button>
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
        <section className="palettes-section">{this.state.currentProject.palettes && this.displayPalettes()}</section>
      </nav>
    );
  }
}

export default Sidebar;
