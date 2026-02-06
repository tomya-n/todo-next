import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import { Todo } from "@/types/todo";

const mockTodos: Todo[] = [
  { id: "1", text: "Active task", completed: false, createdAt: 1000 },
  { id: "2", text: "Completed task", completed: true, createdAt: 2000 },
];

const mockAddTodo = vi.fn();
const mockToggleTodo = vi.fn();
const mockDeleteTodo = vi.fn();

vi.mock("@/hooks/useTodos", () => ({
  useTodos: vi.fn(() => ({
    todos: mockTodos,
    isLoaded: true,
    addTodo: mockAddTodo,
    toggleTodo: mockToggleTodo,
    deleteTodo: mockDeleteTodo,
  })),
}));

import { useTodos } from "@/hooks/useTodos";
const mockUseTodos = vi.mocked(useTodos);

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      isLoaded: true,
      addTodo: mockAddTodo,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });
  });

  it("renders the TODO heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "TODO" })
    ).toBeInTheDocument();
  });

  it("renders TodoForm, TodoFilter, and TodoList", () => {
    render(<Home />);
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
  });

  it("shows Loading... when isLoaded is false", () => {
    mockUseTodos.mockReturnValue({
      todos: [],
      isLoaded: false,
      addTodo: mockAddTodo,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("filters to show only active todos when Active filter is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.queryByText("Completed task")).not.toBeInTheDocument();
  });

  it("filters to show only completed todos when Completed filter is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.queryByText("Active task")).not.toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
  });

  it("shows all todos when All filter is clicked after filtering", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "Active" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
  });
});
