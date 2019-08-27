import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("App", () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should return projects with id and name as properties when cleanProjects is invoked", () => {
    const projects = [{ id: 1, name: "Pojr", created_at: "9999" }];

    const cleanProjects = [{ id: 1, name: "Pojr" }];

    const result = [{ id: 1, name: "Pojr" }];

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

  it("should invoke createScheme when handleClick is invoked", () => {
    instance.createScheme = jest.fn();
    instance.handleClick();

    expect(instance.createScheme).toHaveBeenCalled();
  });

  it("should return an array of color objects when mapLockedColors is invoked", () => {
    instance.state.colors = [
      {
        hex: "ffffff",
        locked: false,
        id: "4aad0620-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "8B663F",
        locked: true,
        id: "fake2"
      },
      {
        hex: "FFEEDC",
        locked: true,
        id: "fake1"
      },
      {
        hex: "cccccc",
        locked: false,
        id: "4aad0623-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "dddddd",
        locked: false,
        id: "4aad0624-c90a-11e9-904f-d561aba1162f"
      }
    ];

    const mockNewColors = [
      {
        hex: "C7925A",
        locked: false,
        id: "4aad0620-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "8B663F",
        locked: false,
        id: "fake2"
      },
      {
        hex: "FFEEDC",
        locked: false,
        id: "fake1"
      },
      {
        hex: "FFDDB9",
        locked: false,
        id: "4aad0623-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "C78A5A",
        locked: false,
        id: "4aad0624-c90a-11e9-904f-d561aba1162f"
      }
    ];

    const colors = instance.mapLockedColors(mockNewColors);

    const expectedColors = [
      {
        hex: "C7925A",
        locked: false,
        id: "4aad0620-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "8B663F",
        locked: true,
        id: "fake2"
      },
      {
        hex: "FFEEDC",
        locked: true,
        id: "fake1"
      },
      {
        hex: "FFDDB9",
        locked: false,
        id: "4aad0623-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "C78A5A",
        locked: false,
        id: "4aad0624-c90a-11e9-904f-d561aba1162f"
      }
    ];

    expect(colors).toEqual(expectedColors);
  });

  it("should map through locked colors and reset colors state", () => {
    instance.state.colors = [
      {
        hex: "ffffff",
        locked: true,
        id: "4aad0620-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "8B663F",
        locked: false,
        id: "fake2"
      },
      {
        hex: "FFEEDC",
        locked: false,
        id: "fake1"
      },
      {
        hex: "cccccc",
        locked: false,
        id: "4aad0623-c90a-11e9-904f-d561aba1162f"
      },
      {
        hex: "dddddd",
        locked: false,
        id: "4aad0624-c90a-11e9-904f-d561aba1162f"
      }
    ];
    const originalColorId1 = wrapper.state("colors")[0].id;
    const originalColorId2 = wrapper.state("colors")[1].id;
    instance.createScheme()
    const newColorId1 = wrapper.state("colors")[0].id;
    const newColorId2 = wrapper.state("colors")[1].id;
    expect(originalColorId1).toEqual(newColorId1);
    expect(originalColorId2).not.toEqual(newColorId2);
  });

  it("should add a new array of five colors to state of colors if color state is empty", () => {
    instance.state.colors = [];
    instance.createScheme();
    expect(wrapper.state("colors").length).toEqual(5);
  });

  it("should change prop of locked in color obj that matches lockedColor id", () => {
    const unlockedColor = wrapper.state("colors")[0];
    const lockedColor = { ...unlockedColor, locked: true }

    instance.toggleLockedColor(lockedColor);

    expect(wrapper.state("colors")[0]).toEqual(lockedColor);
  });

  it("should not change prop of locked in color obj that doesn't match lockedColor id", () => {
    const unlockedColor1 = wrapper.state("colors")[0];
    const lockedColor = { ...unlockedColor1, locked: true };
    const unlockedColor2 = wrapper.state("colors")[1];

    instance.toggleLockedColor(lockedColor);
    
    expect(wrapper.state("colors")[1]).toEqual(unlockedColor2);
  });



});
