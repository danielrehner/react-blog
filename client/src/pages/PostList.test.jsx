import { rest } from "msw";
import { describe, it } from "vitest";
import { mockServer } from "./../../test-setup/mockServer";
import { renderRoute } from "./../../test-setup/renderRoute";
import { postListRoute } from "./PostList";

describe("PostList", () => {
  it("renders a list of posts", async () => {
    const posts = [
      {
        id: 1,
        title: "first post",
        body: "first post body",
        userId: 1,
      },
      {
        id: 2,
        title: "second post",
        body: "second post body",
        userId: 2,
      },
    ];

    mockServer.use(
      rest.get(`${import.meta.env.VITE_API_URL}/posts`, (req, res, ctx) => {
        return res(ctx.json(posts));
      })
    );

    const { findByText } = renderRoute("/posts", {
      route: { element: postListRoute.element },
    });

    await findByText("first post");
    await findByText("second post");
  });
});
