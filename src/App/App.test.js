import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<App />)
    instance = wrapper.instance();
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
  });

  it("should set state of schemeHover to false when onMouseOut is invoked", () => {
    instance.state.schemeHover = true;
    instance.onMouseOut();

    expect(wrapper.state("schemeHover")).toEqual(false);
  });

  it("should set state of schemeHover to false when onMouseOver is invoked", () => {
    instance.state.schemeHover = false;
    instance.onMouseOver();

    expect(wrapper.state("schemeHover")).toEqual(true);
  });
})
