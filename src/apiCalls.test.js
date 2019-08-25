import { fetchProjects, fetchOneProject, fetchPalettes, fetchOnePalette, postProject, postPalette, deleteProject, deletePalette, patchPalette, patchProject } from "./apiCalls";

describe("apiCalls", () => {
  describe("fetchProjects", () => {
    let mockProjects;

    beforeEach(() => {
      mockProjects = [
        { name: "test project 1" },
        { name: "test project 2" },
        { name: "test project 3" }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProjects)
        });
      });
    });

    it.skip("should be called with correct URL", () => {
      const expected = "http://swatchr-be.herokuapp.com/api/v1/projects";
      fetchProjects();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchProjects();
      expect(result).toEqual(mockProjects);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchProjects()).rejects.toEqual(
        Error("Could not fetch projects")
      );
    });
  });

  

});
