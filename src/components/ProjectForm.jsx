import { useState } from "react";

const EMPTY = { title: "", category: "", description: "", image: "", link: "" };

export default function ProjectForm({ onAddProject }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!values.title.trim()) errs.title = "Title is required";
    if (!values.category.trim()) errs.category = "Category is required";
    if (!values.description.trim())
      errs.description = "Description is required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    onAddProject({
      ...values,
      title: values.title.trim(),
      category: values.category.trim(),
      description: values.description.trim(),
      image:
        values.image.trim() ||
        `https://picsum.photos/seed/${encodeURIComponent(values.title)}/600/400`,
    });
    setValues(EMPTY);
  }

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {props.textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          value={values[name]}
          onChange={handleChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={props.type || "text"}
          value={values[name]}
          onChange={handleChange}
        />
      )}
      {errors[name] && (
        <span className="error" role="alert">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {field("title", "Title *")}
      {field("category", "Category *")}
      {field("description", "Description *", { textarea: true })}
      {field("image", "Image URL (optional)", { type: "url" })}
      {field("link", "Project link (optional)", { type: "url" })}
      <button type="submit" className="btn">
        Add Project
      </button>
    </form>
  );
}
