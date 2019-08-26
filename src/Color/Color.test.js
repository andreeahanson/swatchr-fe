import React from 'react';
import { shallow } from 'enzyme';
import Color from './Color';

describe('Color', () => {
  let wrapper;
  let mockHex = 'ffff';
  let mockLocked = false;
  let mockKey = 1;
  let mockId = 1;
  let mockToggleLockedColor = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Color hex={mockHex} locked={mockLocked} key={mockKey} id={mockId} toggleLockedColor={mockToggleLockedColor} />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})