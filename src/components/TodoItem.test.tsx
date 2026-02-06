import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import { Todo } from "@/types/todo";

const incompleteTodo: Todo = {
  id: "1",
  text: "Buy groceries",
  completed: false,
  createdAt: Date.now(),
};

const completedTodo: Todo = {
  id: "2",
  text: "Walk the dog",
  completed: true,
  createdAt: Date.now(),
};

describe("TodoItem", () => {
  it("displays the todo text for an incomplete todo", () => {
    render(
      <TodoItem todo={incompleteTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  it("applies line-through style to completed todo text", () => {
    render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const textElement = screen.getByText("Walk the dog");
    expect(textElement).toHaveClass("line-through");
  });

  it("does not apply line-through style to incomplete todo text", () => {
    render(
      <TodoItem todo={incompleteTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const textElement = screen.getByText("Buy groceries");
    expect(textElement).not.toHaveClass("line-through");
  });

  it("calls onToggle with todo id when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={vi.fn()} />
    );

    await user.click(screen.getByRole("button", { name: "完了にする" }));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete with todo id when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <TodoItem todo={incompleteTodo} onToggle={vi.fn()} onDelete={onDelete} />
    );

    await user.click(screen.getByRole("button", { name: "削除" }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("shows checkmark SVG for completed todo", () => {
    render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const toggleButton = screen.getByRole("button", { name: "未完了に戻す" });
    const svg = toggleButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not show checkmark SVG for incomplete todo", () => {
    render(
      <TodoItem todo={incompleteTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    const toggleButton = screen.getByRole("button", { name: "完了にする" });
    const svg = toggleButton.querySelector("svg");
    expect(svg).toBeNull();
  });
});
