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

  it('should call handleEdit and clearForm when handleKeyDown is invoked', () => {
    const mockEvent = { keyCode: 13, preventDefault: jest.fn() }
    
    wrapper.instance().handleKeyDown(mockEvent)

    expect(wrapper.state('displayInput')).toEqual(false)
  });

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

  it("should update state of name to empty string when clearForm is invoked", () => {
    wrapper.instance().clearForm();

    expect(wrapper.state("currentProjectName")).toEqual("");
  });

  it('should call deleteFetchProject and returnProjectWithPalettes when handleDelete is invoked', () => {
    const mockEvent = { preventDefault: jest.fn() }

    // wrapper.find('.close-img').simulate('click');
    wrapper.instance().handleDelete(mockEvent)

    expect(wrapper.instance().props.deleteFetchProject).toHaveBeenCalled();
    expect(wrapper.instance().props.returnProjectWithPalettes).toHaveBeenCalled();
  });

  it.skip('should change the state for currentProject (to -1), for selectedProject (to "Select Project"), and for displayHeaderButtons (from true to false) when handleDelete is invoked', () => {
    const mockEvent = { preventDefault: jest.fn() }

    wrapper.state.selectedProject = "Mock Project"
    wrapper.state.displayHeaderButtons = true
    wrapper.state.currentProject = { id: 1 }

    wrapper.instance().handleDelete(mockEvent)
    wrapper.instance().props.returnProjectWithPalettes(-1)

    expect(wrapper.state('selectedProject')).toEqual("Select Project")
    expect(wrapper.state('displayHeaderButtons')).toEqual(false)
    expect(wrapper.state('currentProject')).toEqual({ id: -1 })
  });

  it('should change the state of displayInput from false to true when toggleEditName is invoked', () => {
    wrapper.state.displayInput = false;

    wrapper.instance().toggleEditName();

    expect(wrapper.state('displayInput')).toEqual(true);
  });

  it('should update state of currentProject to "Select Project" when selectProject is called but there is no project selected', () => {
    const mockEvent = { nativeEvent: { target :  1 } }
    const mockProjectId = -1;
    wrapper.state.currentProject = { id: -1 }

    wrapper.instance().selectProject(mockEvent)

    expect(wrapper.state('selectedProject')).toEqual("Select Project")
  });

  it('should update state of currentProject to "Select Project" when selectProject is called but there is no project selected', () => {
    const mockEvent = { nativeEvent: { target : { selectedOptions : [ { id: -1 } ] } } }
    const mockProjectId = mockEvent.nativeEvent.target.selectedOptions[0].id
    
    wrapper.instance().selectProject(mockEvent)

    expect(wrapper.state('currentProject').id).toEqual(mockProjectId)
  });

  it('should update state of currentProject to the projectValue when selectProject is called and there is a project selected', () => {
    const mockEvent = { nativeEvent: { target : { selectedOptions : [ { id: 1 } ] } } }
    const mockProjectId = mockEvent.nativeEvent.target.selectedOptions[0].id
    
    wrapper.instance().selectProject(mockEvent)

    expect(wrapper.instance().props.returnProjectWithPalettes).toHaveBeenCalledWith(mockProjectId);
  })
})