import React from "react";
import Palette from "./Palette";
import { shallow } from "enzyme";

describe("Palette", () => {
  let wrapper;
  let instance;

  let mockId = 1;
  let mockProjectId = 1;
  let mockKey = 1;
  let mockColors = [{ hex: "ffff", locked: false }];
  let mockReturnColors = jest.fn();
  let mockDeleteFetchPalette = jest.fn();
  let mockPatchFetchPalette = jest.fn();
  let mockReturnProjectWithPalettes = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Palette
        id={mockId}
        projectId={mockProjectId}
        key={mockKey}
        colors={mockColors}
        returnColors={mockReturnColors}
        deleteFetchPalette={mockDeleteFetchPalette}
        patchFetchPalette={mockPatchFetchPalette}
        returnProjectWithPalettes={mockReturnProjectWithPalettes}
      />
    );

    instance = wrapper.instance();
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call patchFetchPalette and returnProjectWithPalettes when handleEdit is invoked', async () => {
    instance.handleEdit();

    await expect(mockPatchFetchPalette).toHaveBeenCalled();
    await expect(mockReturnProjectWithPalettes).toHaveBeenCalled();
  });

  it("should update state of name to empty string when clearForm is invoked", () => {
    instance.clearForm();

    expect(wrapper.state("name")).toEqual("");
  });

  it("should update state of hover to true when displayButtons is invoked", () => {
    instance.state.hover = false;
    instance.displayButtons();

    expect(wrapper.state("hover")).toEqual(true);
  });

  it("should update state of hover to false when hideButtons is invoked", () => {
    instance.state.hover = true;
    instance.hideButtons();

    expect(wrapper.state("hover")).toEqual(false);
  });

  it("should call returnColors when handleClick is invoked", () => {
    instance.handleClick();

    expect(mockReturnColors).toHaveBeenCalled();
  });

  it("should update state of name to the correct name when handleChange is invoked", () => {
    const mockEvent = {
      target: {
        value: "Mock Palette Name"
      }
    }
    instance.state.name = "";
    instance.handleChange(mockEvent);

    expect(wrapper.state("name")).toEqual("Mock Palette Name");
  });

  it("should update displayInput state when toggleEditName is invoked", () => {
    instance.state.displayInput = false
    instance.toggleEditName();

    expect(wrapper.state("displayInput")).toEqual(true);
  });

  it("should call deleteFetchPatch and returnProjectsWithPalettes when handleDelete is invoked", () => {
    const mockEvent = {
      preventDefault: jest.fn()
    };
    instance.handleDelete(mockEvent);

    expect(mockDeleteFetchPalette).toHaveBeenCalled();
    expect(mockReturnProjectWithPalettes).toHaveBeenCalled();
  });

  it("should call handleEdit, toggleEditName, and clearForm when handleKeyDown is invoked", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      keyCode: 13
    };
    instance.handleEdit = jest.fn();
    instance.toggleEditName = jest.fn();
    instance.clearForm = jest.fn();
    instance.handleKeyDown(mockEvent);

    expect(instance.handleEdit).toHaveBeenCalled();
    expect(instance.toggleEditName).toHaveBeenCalled();
    expect(instance.clearForm).toHaveBeenCalled();
  });

});
