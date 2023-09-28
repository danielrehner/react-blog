import { MockNavigationProvider, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { describe, expect, it } from "vitest";
import { mockServer } from "../../test-setup/mockServer";
import { renderRoute } from "../../test-setup/renderRoute";
import { RootLayout } from "./RootLayout";

describe("RootLayout", () => {
  it("renders navigation links", () => {
    const { getByText } = renderRoute(<RootLayout />);

    getByText("My App");
    getByText("Posts");
    getByText("Users");
    getByText("Todos");
  });

  it("renders outlet content", async () => {
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

    const { getByText, getByTestId } = renderRoute("/", {
      element: <RootLayout />,
    });
    getByText("Posts");
    const container = await getByTestId("container");

    await waitFor(() => {
      expect(container).toHaveTextContent("first post");
      expect(container).toHaveTextContent("second post");
    });
  });

  it("renders loading spinner when navigation state is loading", () => {
    const { getByTestId } = renderRoute("/", {
      element: <RootLayout />,
      wrapper: ({ children }) => (
        <MockNavigationProvider state="loading">
          {children}
        </MockNavigationProvider>
      ),
    });

    getByTestId("loading-spinner");
  });
});
