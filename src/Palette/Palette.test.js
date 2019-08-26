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
    instance.displayButtons();

    expect(wrapper.state("hover")).toEqual(true);
  });
});
