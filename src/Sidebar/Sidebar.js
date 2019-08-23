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
    currentProject: {},
    navDisplay: false
  };

  displayPalettes = () => {
    return this.state.currentProject.palettes.map((palette, i) => {
      const { color1, color2, color3, color4, color5, name } = palette;
      const colors = [color1, color2, color3, color4, color5];
      return (
        <Palette
          key={i}
          colors={colors}
          name={name}
          returnColors={this.props.returnColors}
        />
      );
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
    if (projectId === 0) {
      currentProject = {};
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
    e.preventDefault();
    if (e.target.name === "paletteBtn") {
      this.setState({ addPalette: !this.state.addPalette });
    } else {
      this.setState({ addProject: !this.state.addProject });
    }
  };

  toggleNav = () => {
    this.setState({navDisplay : !this.state.navDisplay})
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-arrow" onClick={this.toggleNav}>
          {!this.state.navDisplay && <img src="./left.png" alt="left-caret"/>}
          {this.state.navDisplay && <img src="./right.png" alt="right-caret"/>}
        </div>
        {this.state.navDisplay && 
        <nav className="sidebar">
          <form className="projects-form">
            <select
              className="projects-select"
              onChange={this.selectProject}
              value={this.state.selectedProject}
            >
              <option value="Select Project" id={0}>
                Select Project
              </option>
              {this.props.projects.length && this.displayOptions()}
            </select>
            <div className="sidebar-add-container add-project">
              <img
                name="projectBtn"
                className="add-proj-btn"
                onClick={this.toggleInput}
                src='./plus.png'
                alt='plus-icon'
              />
              <p>Add Project</p>
            </div>
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
          <div className="sidebar-add-container add-project">
            <img
                  name="paletteBtn"
                  className="save-palette-btn"
                  src='./save.png'
                  alt='save-icon'
                />
              <p>Save Palette</p>
          </div>
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
          <section className="palettes-section">
            {this.state.currentProject.palettes && this.displayPalettes()}
          </section>
        </nav>}
      </div>
    );
  }
}

export default Sidebar;
