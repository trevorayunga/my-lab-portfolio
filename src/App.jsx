import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import Footer from "./components/Footer";
import useProjects from "./hooks/useProjects";

export default function App() {
  const { projects, total, query, setQuery, addProject, deleteProject } =
    useProjects();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="work" className="container section">
          <h2>Our Work</h2>
          <SearchBar query={query} onQueryChange={setQuery} />
          <ProjectList
            projects={projects}
            total={total}
            onDelete={deleteProject}
          />
        </section>
        <section id="add" className="container section">
          <h2>Add a New Project</h2>
          <ProjectForm onAddProject={addProject} />
        </section>
      </main>
      <Footer />
    </>
  );
}
