import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "./TodoForm";

describe("TodoForm", () => {
  it("displays placeholder text", () => {
    render(<TodoForm onAdd={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  it("disables Add button when input is empty", () => {
    render(<TodoForm onAdd={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("disables Add button when input is only whitespace", async () => {
    const user = userEvent.setup();
    render(<TodoForm onAdd={vi.fn()} />);

    await user.type(screen.getByPlaceholderText("What needs to be done?"), "   ");
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("calls onAdd with input text and clears input on submit", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Buy milk");
    expect(screen.getByRole("button", { name: "Add" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(input).toHaveValue("");
  });
});
