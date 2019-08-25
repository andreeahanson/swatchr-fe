export const fetchProjects = async (url) => {
  try {
    const response = await fetch(url)
    if(!response.ok){
      throw new Error("Could not fetch projects")
    } else {
      const projects = response.json();
      return projects
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const fetchOneProject = async (url) => {
  try {
    const response = await fetch(url)
    if(!response.ok){
      throw new Error("Could not fetch project")
    } else {
      const project = response.json();
      return project
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const fetchPalettes = async (url, project_id) => {
  try {
    const response = await fetch(url, project_id)
    if(!response.ok){
      throw new Error("Could not fetch palettes")
    } else {
      const palettes = response.json();
      return palettes
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const fetchOnePalette = async (url, id) => {
  try {
    const response = await fetch(url, id)
    if(!response.ok){
      throw new Error("Could not fetch palette")
    } else {
      const palette = response.json();
      return palette
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}


export const postPalette = async (url, object) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Could not add new palette")
    }
    const palette = await response.json()
    return palette;
  }
  catch (error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const postProject = async (url, object) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Could not add new project")
    }
    const project = await response.json()
    return project;
  }
  catch (error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const deletePalette = async (url) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  try {
    const response = await fetch(url, options)
    if(!response.ok){
      throw new Error("Could not delete palette")
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const deleteProject = async (url) => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  try {
    const response = await fetch(url, options)
    if(!response.ok){
      throw new Error("Could not delete project")
    }
  } catch(error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const patchPalette = async (url, object) => {
  try {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Could not edit name of palette")
    }
    const palette = await response.json()
    return palette;
  }
  catch (error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}

export const patchProject = async (url, object) => {
  try {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error("Could not edit name of project")
    }
    const project = await response.json()
    return project;
  }
  catch (error) {
    throw new Error({error, message: "There was an error with the server"})
  }
}