export default function ProjectCard({ project, onDelete }) {
  const { id, title, category, description, image, link } = project;

  return (
    <li className="card">
      {image && <img src={image} alt={title} loading="lazy" />}
      <div className="card__body">
        <span className="badge">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="card__actions">
          {link && (
            <a href={link} target="_blank" rel="noreferrer">
              View project
            </a>
          )}
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
