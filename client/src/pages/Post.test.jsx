import { rest } from "msw";
import { describe, it } from "vitest";
import { mockServer } from "../../test-setup/mockServer";
import { renderRoute } from "../../test-setup/renderRoute";
import { postRoute } from "./Post";

describe("Post", () => {
  it("renders post details and comments", async () => {
    const postId = 1;
    const comments = [
      {
        id: 1,
        name: "test user",
        email: "test@test.com",
        body: "test comment",
        postId: 1,
      },
    ];
    const post = {
      id: postId,
      title: "test post",
      body: "test post body",
      userId: 1,
    };
    const user = {
      id: 1,
      name: "test user",
    };

    mockServer.use(
      rest.get(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
        (req, res, ctx) => {
          return res(ctx.json(comments));
        }
      ),
      rest.get(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        (req, res, ctx) => {
          return res(ctx.json(post));
        }
      ),
      rest.get(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        (req, res, ctx) => {
          return res(ctx.json(user));
        }
      )
    );

    const { findByText } = renderRoute(`/posts/${postId}`, {
      route: { element: postRoute.element },
      params: { postId },
    });

    await findByText(post.title);
    await findByText(post.body);
    await findByText(user.name);
    await findByText(comments[0].email);
    await findByText(comments[0].body);
  });
});
