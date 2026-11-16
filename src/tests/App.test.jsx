import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Portfolio Platform", () => {
  test("renders the initial list of projects", () => {
    render(<App />);
    const list = screen.getByRole("list", { name: /projects/i });
    expect(within(list).getAllByRole("listitem").length).toBeGreaterThanOrEqual(4);
  });

  test("filters projects with the search bar", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search projects/i), "savanna");
    expect(screen.getByText("Savanna Tours Website")).toBeInTheDocument();
    expect(screen.queryByText("Aurora Brand Identity")).not.toBeInTheDocument();
  });

  test("shows an empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search projects/i), "zzzzzz");
    expect(screen.getByRole("status")).toHaveTextContent(/no projects match/i);
  });

  test("shows validation errors for an empty form", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /add project/i }));
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });

  test("adds a new project through the form", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/^title/i), "Zuri Campaign");
    await user.type(screen.getByLabelText(/^category/i), "Marketing");
    await user.type(screen.getByLabelText(/^description/i), "A social media campaign.");
    await user.click(screen.getByRole("button", { name: /add project/i }));
    expect(screen.getByText("Zuri Campaign")).toBeInTheDocument();
    expect(screen.getByLabelText(/^title/i)).toHaveValue("");
  });

  test("deletes a project", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /delete aurora brand identity/i }));
    expect(screen.queryByText("Aurora Brand Identity")).not.toBeInTheDocument();
  });
});
