import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const ASSET = "AssetTrack - Asset & Inventory Management System";
const ECOM = "Multi-Vendor E-Commerce Platform";
const DOCTOR = "Doctor Booking App";

describe("Portfolio Platform", () => {
  test("renders the initial list of projects", () => {
    render(<App />);
    const list = screen.getByRole("list", { name: /projects/i });
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText(ASSET)).toBeInTheDocument();
    expect(screen.getByText(ECOM)).toBeInTheDocument();
  });

  test("renders the hero with name and role", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /ombaso trevor ayunga/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/full stack developer/i)).toBeInTheDocument();
  });

  test("filters projects with the search bar", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search projects/i), "doctor");
    expect(screen.getByText(DOCTOR)).toBeInTheDocument();
    expect(screen.queryByText(ASSET)).not.toBeInTheDocument();
    expect(screen.queryByText(ECOM)).not.toBeInTheDocument();
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
    await user.type(
      screen.getByLabelText(/^description/i),
      "A social media campaign."
    );
    await user.click(screen.getByRole("button", { name: /add project/i }));
    expect(screen.getByText("Zuri Campaign")).toBeInTheDocument();
    expect(screen.getByLabelText(/^title/i)).toHaveValue("");
  });

  test("persists added projects across reloads", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.type(screen.getByLabelText(/^title/i), "Persisted Project");
    await user.type(screen.getByLabelText(/^category/i), "Test");
    await user.type(screen.getByLabelText(/^description/i), "Should survive.");
    await user.click(screen.getByRole("button", { name: /add project/i }));
    unmount();

    render(<App />);
    expect(screen.getByText("Persisted Project")).toBeInTheDocument();
  });

  test("deletes a project", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: new RegExp(`delete ${DOCTOR}`, "i") })
    );
    expect(screen.queryByText(DOCTOR)).not.toBeInTheDocument();
  });
});