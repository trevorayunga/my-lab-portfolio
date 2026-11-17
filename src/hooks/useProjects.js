import { useReducer, useMemo, useState, useEffect } from "react";
import { initialProjects } from "../data/initialProjects";

const STORAGE_KEY = "portfolio-projects";

function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: Date.now() }, ...state];
    case "DELETE":
      return state.filter((p) => p.id !== action.id);
    default:
      return state;
  }
}


function loadProjects(seed) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seed;
  } catch {
    return seed;
  }
}


export default function useProjects(seed = initialProjects) {
  const [projects, dispatch] = useReducer(projectsReducer, seed, loadProjects);
  const [query, setQuery] = useState("");

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      
    }
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.category, p.description].some((f) =>
        f.toLowerCase().includes(q)
      )
    );
  }, [projects, query]);

  return {
    projects: filtered,
    total: projects.length,
    query,
    setQuery,
    addProject: (project) => dispatch({ type: "ADD", payload: project }),
    deleteProject: (id) => dispatch({ type: "DELETE", id }),
  };
}