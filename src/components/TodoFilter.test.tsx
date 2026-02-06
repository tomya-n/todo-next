import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoFilter } from "./TodoFilter";

describe("TodoFilter", () => {
  it("renders all three filter buttons", () => {
    render(<TodoFilter current="all" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Completed" })
    ).toBeInTheDocument();
  });

  it("applies blue background to the currently selected filter", () => {
    render(<TodoFilter current="active" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Active" })).toHaveClass(
      "bg-blue-600"
    );
    expect(screen.getByRole("button", { name: "All" })).not.toHaveClass(
      "bg-blue-600"
    );
    expect(screen.getByRole("button", { name: "Completed" })).not.toHaveClass(
      "bg-blue-600"
    );
  });

  it("calls onChange with 'all' when All button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TodoFilter current="active" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(onChange).toHaveBeenCalledWith("all");
  });

  it("calls onChange with 'active' when Active button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TodoFilter current="all" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(onChange).toHaveBeenCalledWith("active");
  });

  it("calls onChange with 'completed' when Completed button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TodoFilter current="all" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(onChange).toHaveBeenCalledWith("completed");
  });
});
