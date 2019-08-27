export const fetchProjects = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch projects");
  } else {
    const projects = response.json();
    return projects;
  }
};

export const fetchOneProject = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch project");
  } else {
    const project = response.json();
    return project;
  }
};

export const fetchPalettes = async (url, project_id) => {
  const response = await fetch(url, project_id);
  if (!response.ok) {
    throw new Error("Could not fetch palettes");
  } else {
    const palettes = response.json();
    return palettes;
  }
};

export const fetchOnePalette = async (url, id) => {
  const response = await fetch(url, id);
  if (!response.ok) {
    throw new Error("Could not fetch palette");
  } else {
    const palette = response.json();
    return palette;
  }
};

export const postPalette = async (url, object) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not add new palette");
  }
  const palette = await response.json();
  return palette;
};

export const postProject = async (url, object) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not add new project");
  }
  const project = await response.json();
  return project;
};

export const deletePalette = async url => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not delete palette");
  }
};

export const deleteProject = async url => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not delete project");
  }
};

export const patchPalette = async (url, object) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not edit the name of the palette");
  }
  const palette = await response.json();
  return palette;
};

export const patchProject = async (url, object) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Could not edit name of project");
  }
  const project = await response.json();
  return project;
};
