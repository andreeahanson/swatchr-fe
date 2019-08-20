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