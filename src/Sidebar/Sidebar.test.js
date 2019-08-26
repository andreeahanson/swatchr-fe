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

})