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

  describe("fetchOneProject", () => {
    let mockProject;

    beforeEach(() => {
      mockProject = {
        name: "Sample 1",
        palettes: [
          {
            name: "Palette 1",
            color1: "#B06454",
            color2: "#B7AE23",
            color3: "#39B723",
            color4: "#23B7B7",
            color5: "#232EB7"
          },
          {
            name: "Palette 2",
            color1: "#B06453",
            color2: "#B7AE26",
            color3: "#39B728",
            color4: "#23B7B5",
            color5: "#232EB1"
          }
        ]
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProject)
        });
      });
    });

    it.skip("should be called with correct URL", () => {
      const expected = "http://swatchr-be.herokuapp.com/api/v1/projects/1";
      fetchOneProject();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchOneProject();
      expect(result).toEqual(mockProject);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchOneProject()).rejects.toEqual(
        Error("Could not fetch project")
      );
    });
  });

  describe("fetchPalettes", () => {
    let mockPalettes;

    beforeEach(() => {
      mockPalettes = [
        {
          name: "Palette 1",
          color1: "#B06454",
          color2: "#B7AE23",
          color3: "#39B723",
          color4: "#23B7B7",
          color5: "#232EB7"
        },
        {
          name: "Palette 2",
          color1: "#B06453",
          color2: "#B7AE26",
          color3: "#39B728",
          color4: "#23B7B5",
          color5: "#232EB1"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalettes)
        });
      });
    });

    it.skip("should be called with correct URL", () => {
      const expected = "http://swatchr-be.herokuapp.com/api/v1/palettes";
      fetchPalettes();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchPalettes();
      expect(result).toEqual(mockPalettes);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchPalettes()).rejects.toEqual(
        Error("Could not fetch palettes")
      );
    });
  });

  describe("fetchOnePalette", () => {
    let mockPalette;

    beforeEach(() => {
      mockPalette = {
        name: "Palette 1",
        color1: "#B06454",
        color2: "#B7AE23",
        color3: "#39B723",
        color4: "#23B7B7",
        color5: "#232EB7"
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalette)
        });
      });
    });

    it.skip("should be called with correct URL", () => {
      const expected = "http://swatchr-be.herokuapp.com/api/v1/projects/1/palettes";
      fetchOnePalette();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it("HAPPY: should return with a parsed response", async () => {
      const result = await fetchOnePalette();
      expect(result).toEqual(mockPalette);
    });

    it("SAD: should return an error if the answer is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(fetchOnePalette()).rejects.toEqual(
        Error("Could not fetch palette")
      );
    });
  });

  describe('postProject', () => {
    let mockProject;
    let mockResponse;

    beforeEach(() => {
      mockProject = {
        name: "Sample 1",
        palettes: [
          {
            name: "Palette 1",
            color1: "#B06454",
            color2: "#B7AE23",
            color3: "#39B723",
            color4: "#23B7B7",
            color5: "#232EB7"
          },
          {
            name: "Palette 2",
            color1: "#B06453",
            color2: "#B7AE26",
            color3: "#39B728",
            color4: "#23B7B5",
            color5: "#232EB1"
          }
        ]
      };

      mockResponse = { id: [1] }

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it.skip('should be called with correct data', () => {
      const expected = [
        'http://swatchr-be.herokuapp.com/api/v1/projects',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mockProject) }
      ];

      postProject(mockProject);

      expect(window.fetch).toHaveBeenCalledWith(...expected)
    });

    it('HAPPY: should return a parsed response', async () => {
      const result = await postProject(mockProject);

      expect(result).toEqual(mockResponse);
    });

    it('SAD: should return an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockResponse)
        });
      });

      expect(postProject(mockProject)).rejects.toEqual(Error('Could not add new project'))
    });

    it('SAD: should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject({
          message: 'Could not add new project'
        });
      });

      expect(postProject(mockProject)).rejects.toEqual(Error('There was an error with the server'))
    })
  });


});
