import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PostCard } from "./PostCard";

describe("PostCard", () => {
  it("renders post card details", () => {
    const post = {
      id: 1,
      title: "test post",
      body: "test post body",
    };

    const { getByText, getByRole } = render(
      <MemoryRouter>
        <PostCard {...post} />
      </MemoryRouter>
    );

    getByText(post.title);
    getByText(post.body);

    const viewButton = getByRole("link");
    expect(viewButton).toHaveAttribute("href", `/posts/${post.id}`);
    expect(viewButton).toHaveTextContent("View");
  });
});
