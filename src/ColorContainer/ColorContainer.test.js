import React from 'react';
import { shallow } from 'enzyme';
import ColorContainer from './ColorContainer';

describe('ColorContainer', () => {
  let wrapper, mockColors;
  let mockDisplaColors = jest.fn();

  beforeEach(() => {
    mockColors = [
      { hex: "fffff", locked: false}
    ]
    wrapper = shallow(<ColorContainer colors={mockColors} displayColors={mockDisplaColors}/>)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});