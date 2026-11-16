import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects, total, onDelete }) {
  if (projects.length === 0) {
    return (
      <p className="empty" role="status">
        {total === 0
          ? "No projects yet. Add your first one below!"
          : "No projects match your search."}
      </p>
    );
  }

  return (
    <ul className="grid" aria-label="Projects">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={onDelete} />
      ))}
    </ul>
  );
}
