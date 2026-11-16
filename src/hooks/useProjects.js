import { useReducer, useMemo, useState } from "react";
import { initialProjects } from "../data/initialProjects";

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

/**
 * Centralised state for the portfolio: the project list and the search query.
 * Lives in <App/>, the nearest common parent of every component that needs it.
 */
export default function useProjects(seed = initialProjects) {
  const [projects, dispatch] = useReducer(projectsReducer, seed);
  const [query, setQuery] = useState("");

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
