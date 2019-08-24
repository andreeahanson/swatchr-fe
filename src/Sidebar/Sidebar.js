import React, { Component } from "react";
import Palette from "../Palette/Palette";
import AddForm from "../AddForm/AddForm";
import "./Sidebar.scss";

class Sidebar extends Component {
  state = {
    selectedProject: "Select Project",
    projectSelect: "",
    currentProject: {},
    navDisplay: false,
    currentProjectName: "",
    displayInput: false
  };

  displayPalettes = () => {
    return this.state.currentProject.palettes.map((palette, i) => {
      const { color1, color2, color3, color4, color5, name } = palette;
      const colors = [color1, color2, color3, color4, color5];
      return (
        <Palette
          id={palette.id}
          key={i}
          colors={colors}
          name={name}
          returnColors={this.props.returnColors}
          deleteFetchPalette={this.props.deleteFetchPalette}
          patchFetchPalette={this.props.patchFetchPalette}
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
    const projectId = e.nativeEvent.target.selectedOptions[0].id;
    const projectValue = e.nativeEvent.target.selectedOptions[0].value;
    let currentProject;
    if (parseInt(projectId) === -1) {
      currentProject = { id: -1 };
    } else {
      currentProject = await this.props.returnProjectWithPalettes(projectId);
    }
    this.setState({
      selectedProject: projectValue,
      currentProject
    });
  };

  toggleNav = () => {
    this.setState({ navDisplay: !this.state.navDisplay });
  };

  handleChange = e => {
    this.setState({ currentProjectName: e.target.value });
  };

  clearForm = () => {
    this.setState({ currentProjectName: "" });
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteFetchProject(this.state.currentProject.id);
  };

  toggleEditName = () => {
    this.setState({ displayInput: !this.state.displayInput });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleEdit();
      this.clearForm();
      this.setState({ displayInput: false })
    }
  };

  handleEdit = () => {
    this.props.patchFetchProject(
      this.state.currentProjectName,
      this.state.currentProject.id
    );
  };

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-arrow" onClick={this.toggleNav}>
          {!this.state.navDisplay && <img src="./left.png" alt="left-caret" />}
          {this.state.navDisplay && <img src="./right.png" alt="right-caret" />}
        </div>
        {this.state.navDisplay && (
          <nav className="sidebar">
            <form className="projects-form">
              <select
                className="projects-select"
                onChange={this.selectProject}
                value={this.state.selectedProject}
              >
                <option value="Select Project" id={-1}>
                  Select Project
                </option>
                {this.props.projects.length && this.displayOptions()}
              </select>
            </form>
            <AddForm
              imageAlt="plus icon"
              imagePath="./plus.png"
              label="Add project"
              postFetch={this.props.postFetch}
              keyName="project"
              currentProjectId={this.state.currentProject.id}
              colors={this.props.colors}
            />
            {this.state.currentProject.id > -1 && (
              <AddForm
                imageAlt="save icon"
                imagePath="./save.png"
                label="Save palette"
                postFetch={this.props.postFetch}
                keyName="palette"
                currentProjectId={this.state.currentProject.id}
                colors={this.props.colors}
              />
            )}
            {this.state.selectedProject !== "Select Project" && (
              <header>
                <h3>{this.state.currentProject.name}</h3>
                <button onClick={this.toggleEditName}>Edit</button>
                {this.state.displayInput && (
                  <input
                    onKeyDown={this.handleKeyDown}
                    type="text"
                    value={this.state.currentProjectName}
                    name="currentProjectName"
                    onChange={this.handleChange}
                    className="edit-project-input"
                  />
                )}
                <button onClick={this.handleDelete}>X</button>
              </header>
            )}
            <section className="palettes-section">
              {this.state.currentProject.palettes && this.displayPalettes()}
            </section>
          </nav>
        )}
      </div>
    );
  }
}

export default Sidebar;
