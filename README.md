# Studio Portfolio Platform (React SPA)

A responsive single-page portfolio app for a creative agency. Visitors can browse projects, search them live, and add new projects through a validated form.

## Features
- Landing page: sticky header, hero, project grid
- Live search (title / category / description)
- Add-project form with validation and instant UI update
- Delete a project
- Responsive CSS Grid layout, mobile friendly
- Tests with Vitest + React Testing Library

## Getting started
```bash
npm install
npm run dev      # start dev server
npm test         # run tests
npm run build    # production build
```

## Component tree & data flow
```
App                       (uses useProjects: projects, query, add, delete)
├── Header
├── main
│   ├── Hero
│   ├── SearchBar         props: query, onQueryChange
│   ├── ProjectList       props: projects, total, onDelete
│   │   └── ProjectCard   props: project, onDelete
│   └── ProjectForm       props: onAddProject   (local state: values, errors)
└── Footer
```

### State
| State | Location | Why |
|---|---|---|
| `projects` (useReducer) | `useProjects` hook, called in `App` | Shared by list, form and search |
| `query` (useState) | `useProjects` hook, called in `App` | Shared by SearchBar and ProjectList |
| `values`, `errors` (useState) | `ProjectForm` | Only the form needs them |

### Events
- `onChange` on search input -> `setQuery`
- `onSubmit` on form -> validate -> `addProject` -> reset form
- `onClick` on Delete -> `deleteProject(id)`

## Folder structure
```
src/
  components/  hooks/  data/  styles/  tests/
```

## Deployment
Set `base` in `vite.config.js` to `/<repo-name>/`, run `npm run build`, and publish `dist/` (e.g. GitHub Pages).
