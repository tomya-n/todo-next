import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";
import { Todo } from "@/types/todo";

const todos: Todo[] = [
  { id: "1", text: "Buy milk", completed: false, createdAt: 1000 },
  { id: "2", text: "Read a book", completed: true, createdAt: 2000 },
];

describe("TodoList", () => {
  it("shows empty message when todos array is empty", () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(
      screen.getByText("No todos yet. Add one above!")
    ).toBeInTheDocument();
  });

  it("renders each todo item when todos are provided", () => {
    render(<TodoList todos={todos} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Read a book")).toBeInTheDocument();
  });

  it("propagates onToggle to the correct todo item", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TodoList todos={todos} onToggle={onToggle} onDelete={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "完了にする" }));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("propagates onDelete to the correct todo item", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<TodoList todos={todos} onToggle={vi.fn()} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
