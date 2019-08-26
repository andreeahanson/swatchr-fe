import React from 'react';
import { shallow } from 'enzyme';
import AddProjectForm from './AddProjectForm';

describe('AddProjectForm', () => {
  let wrapper;
  let mockPostFetchProject= jest.fn()
  let mockCurrentProjectId=1
  let mockColors= [
    { hex: "ffff", locked: false },
    { hex: "gggg", locked: false },
    { hex: "hhhh", locked: false },
    { hex: "iiii", locked: false },
    { hex: "jjjj", locked: false }
  ]

  beforeEach(() => {
    wrapper = shallow(<AddProjectForm postFetchProject={mockPostFetchProject}  currentProjectId={mockCurrentProjectId} colors={mockColors}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })


})