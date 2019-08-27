import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import {
  fetchProjects,
  fetchOneProject,
  postProject,
  postPalette,
  deletePalette,
  deleteProject,
  patchPalette,
  patchProject
} from "../apiCalls";
jest.mock('../apiCalls', () => ({
  fetchProjects: jest.fn().mockImplementation(() => {
    return [ {id: 1, name: "Mock Project", created_at: "dsfsd", updated_at: "565hkfgdfgfd"} ] 
  }),
  fetchOneProject: jest.fn().mockImplementation(() => {
    return {id: 1, name: "Mock Project", created_at: "dsfsd", updated_at: "565hkfgdfgfd", palettes: [ {
      name: "Mock Palette",
      project_id: 1,
      color1: "red",
      color2: "green",
      color3: "pink",
      color4: "blue",
      color5: "orange"
    } ]}
  }),
  postProject: jest.fn().mockImplementation(() => {
    return { id: [1] }
  }),
  postPalette: jest.fn().mockImplementation(() => {
    return { id: 1 }
  }),
  deletePalette: jest.fn(),
  deleteProject: jest.fn(),
  patchPalette: jest.fn().mockImplementation(() => {
    return { id: 1, name: "Changed palette"}
  }),
  patchProject: jest.fn().mockImplementation(() => {
    return { id:1, name: "Changed project" }
  })
}));

describe("App", () => {
  let wrapper;
  let instance;
  let mockProjects;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
    mockProjects = [
      { id: 1, name: "Mock Project 1" },
      { id: 2, name: "Mock Project 2" }
    ]

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects)
      });
    });
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

  it("should clean array of colors", () => {
    const mockColors = [ "ffffff", "cccccc", "dddddd", "aaaaaa", "bbbbbb" ];

    const cleanedColors = instance.cleanColors(mockColors);

    expect(cleanedColors[0].hex).toEqual(mockColors[0].toUpperCase());
  })

  it("should reset color state to new cleaned array of color objects", () => {
    const oldColorState = wrapper.state("colors");
    const mockColors = ["ffffff", "cccccc", "dddddd", "aaaaaa", "bbbbbb"];

    instance.returnColors(mockColors);

    const newColorState = wrapper.state("colors");

    expect(oldColorState[0].id).not.toEqual(newColorState[0].id);
  });

  it("should clean an array of projects", () => {
    const mockProjects = [
      {
        name: "SampleName1",
        id: 1,
        created_at: "s2454134t6iubrg",
        updated_at: "kjndf97y9314t"
      },
      {
        name: "SampleName2",
        id: 1,
        created_at: "s2454wqgrq34tiubrg",
        updated_at: "kjn134t23df97y9"
      }
    ];

    const cleanedProjects = instance.cleanProjects(mockProjects);

    expect(mockProjects[0].created_at).toEqual("s2454134t6iubrg");
    expect(cleanedProjects[0].created_at).toEqual(undefined);
  });

  // it('should set state of currentProject to empty object if there is no project selected', () => {

  // });

  // it('should call fetchOneProject if a project is selected when returnProjectWithPalettes is invoked', () => {

  // });

  // it('should set the state of error to error.message if the try was unsuccessfull', () => {

  // });

  it('should call postPalette with the correct URL', () => {
    const url = `http://swatchr-be.herokuapp.com/api/v1/projects/1/palettes`

    const newPalette = {
      name: "Mock Palette",
      project_id: 1,
      color1: "red",
      color2: "green",
      color3: "pink",
      color4: "blue",
      color5: "orange"
    }

    const project = { id : 1, name: "Mock Project" }

    instance.postFetchPalette(newPalette, project);

    expect(postPalette).toHaveBeenCalledWith(url, newPalette)
  })
});
