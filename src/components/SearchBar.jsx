export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">
        Search projects
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search by title, category or description..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
}
