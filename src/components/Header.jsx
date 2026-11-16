export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="logo">
          My portfolio<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#add">Add Project</a>
        </nav>
      </div>
    </header>
  );
}
