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
  });

  it('should update state when user types in input', () => {
    const mockEvent =  { target: { name: "name", value: "test name" } }
    const expected = "test name"
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('name')).toEqual(expected);
  });

  it('should update state when toggleInput is called', () => {
    wrapper.instance().toggleInput();
    expect(wrapper.state('displayInput')).toEqual(true);
  });

  it('should update state when clearInput is called', () => {
    wrapper.instance().clearInput();
    expect(wrapper.state('name')).toEqual('');
  });

})