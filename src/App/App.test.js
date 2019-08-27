import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return projects with id and name as properties when cleanProjects is invoked', () => {
    const projects = [{ id: 1, name: "Pojr", created_at: "9999" }]

    const cleanProjects = [{ id: 1, name: "Pojr" }]

    const result = [{ id: 1, name: "Pojr" } ]

    wrapper.instance().cleanProjects(projects);

    expect(result).toEqual(cleanProjects);
  })
})
