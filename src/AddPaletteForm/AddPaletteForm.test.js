import React from 'react';
import { shallow } from 'enzyme';
import AddPaletteForm from './AddPaletteForm';

describe('AddPaletteForm', () => {
  let wrapper;
  let mockPostFetchPalette= jest.fn()
  let mockCurrentProject={name: "Test Mock Project"}
  let mockColors= [
    { hex: "ffff", locked: false },
    { hex: "gggg", locked: false },
    { hex: "hhhh", locked: false },
    { hex: "iiii", locked: false },
    { hex: "jjjj", locked: false }
  ]

  beforeEach(() => {
    wrapper = shallow(<AddPaletteForm postFetchPalette={mockPostFetchPalette}  currentProject={mockCurrentProject} colors={mockColors}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

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

  it('should call toggleInput and clear input when handleSubmit is called', () => {
    const mockEvent =  { keyCode: 13, preventDefault: jest.fn()}
    wrapper.instance().toggleInput = jest.fn();
    wrapper.instance().clearInput = jest.fn();

    wrapper.instance().handleSubmit(mockEvent);

    expect(wrapper.instance().toggleInput).toHaveBeenCalled();
    expect(wrapper.instance().clearInput).toHaveBeenCalled();
  })
})