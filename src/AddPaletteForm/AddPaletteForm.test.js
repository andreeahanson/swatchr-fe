import React from 'react';
import { shallow } from 'enzyme';
import AddPaletteForm from './AddPaletteForm';

describe('AddPaletteForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddPaletteForm />)
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
    wrapper.instance().toggleInput()
    expect(wrapper.state('displayInput')).toEqual(true);
  })
})