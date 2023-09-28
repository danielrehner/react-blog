import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  it("renders todo item details", async () => {
    const todo = {
      id: 1,
      title: "test todo",
      completed: false,
    };

    const { findByText, getByRole } = render(<TodoItem {...todo} />);

    await findByText(todo.title);
    const todoItem = getByRole("listitem");
    expect(todoItem.className).not.toContain("strike-through");
  });

  it("renders completed todo item details", async () => {
    const todo = {
      id: 1,
      title: "test todo",
      completed: true,
    };

    const { findByText, getByRole } = render(<TodoItem {...todo} />);

    await findByText(todo.title);
    const todoItem = getByRole("listitem");
    expect(todoItem.className).toContain("strike-through");
  });
});
