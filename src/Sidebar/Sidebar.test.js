import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  let wrapper;
  let mockProjects = [
    { id: 1, name: "Project1" }
  ]
  let mockReturnColors = jest.fn();
  let mockReturnProjectWithPalettes = jest.fn();
  let mockPostFetchProject = jest.fn();
  let mockPostFetchPalette = jest.fn();
  let mockColors = [
    { hex: "ffff", locked: false }
  ]
  let mockDeleteFetchPalette = jest.fn();
  let mockPatchFetchPalette = jest.fn();
  let mockDeleteFetchProject = jest.fn();
  let mockPatchFetchProject = jest.fn();
  let mockCurrentProject = {
    id: 1,
    name: "Current Mock Project",
    palettes: [
      { id: 1 , name: "Mock Palette", project_id: 1, color1: "red", color2: "yellow", color3:"blue", color4:"green", color5:"pink"}
    ]
  }
  let mockProject = {
    id: 1,
    name: "Current Mock Project",
    palettes: [
      { id: 1 , name: "Mock Palette", project_id: 1, color1: "red", color2: "yellow", color3:"blue", color4:"green", color5:"pink"}
    ]
  }

  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProject)
    });
  });

  beforeEach(() => {
    wrapper = shallow(
    <Sidebar 
    projects={mockProjects}
    returnColors={mockReturnColors}
    returnProjectWithPalettes={mockReturnProjectWithPalettes}
    postFetchProject={mockPostFetchProject}
    postFetchPalette={mockPostFetchPalette}
    colors={mockColors}
    deleteFetchPalette={mockDeleteFetchPalette}
    patchFetchPalette={mockPatchFetchPalette}
    deleteFetchProject={mockDeleteFetchProject}
    patchFetchProject={mockPatchFetchProject}
    currentProject={mockCurrentProject}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should call handleEdit and clearForm when handleKeyDown is invoked', () => {
  //   // wrapper.state.displayInput = false;
  //   // wrapper.state.selectedProject = "Project1";
  //   // wrapper.state.navDisplay = true;

  //   wrapper.find('.edit-project-input').simulate('keyDown', {
  //     which: 13,
  //     ctrlKey: true
  //   })

  //   expect(wrapper.instance().handleEdit).toHaveBeenCalled();
  //   expect(wrapper.instance().clearForm).toHaveBeenCalled();
  // });

  it('should call patchFetchProject and returnProjectWithPalettes when handleEdit is invoked', async () => {
    wrapper.instance().handleEdit(mockCurrentProject, mockCurrentProject.id)

    await expect(wrapper.instance().props.patchFetchProject).toHaveBeenCalled();
    expect(wrapper.instance().props.returnProjectWithPalettes).toHaveBeenCalled();
  });

  it('should change state property displayHeaderButtons from false to true when toggleHeaderButtons is invoked', () => {
    wrapper.state.displayHeaderButtons = false;
    wrapper.instance().toggleHeaderButtons();

    expect(wrapper.state('displayHeaderButtons')).toEqual(true);
  });

  it('should change state property navDisplay from false to true when toggleNav is invoked', () => {
    wrapper.state.navDisplay = false;
    wrapper.instance().toggleNav();

    expect(wrapper.state('navDisplay')).toEqual(true);
  });

  it('should change state property navDisplay from false to true when handleChange is invoked', () => {
    let mockEvent = { target: { value: "Current Mock Project" } }
    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state('currentProjectName')).toEqual(mockEvent.target.value);
  });

})