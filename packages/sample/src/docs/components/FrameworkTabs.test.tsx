// @vitest-environment happy-dom
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import DocPage from "./DocPage";
import { SiteProviders, setupI18n } from "../../test/utils";

// The custom elements themselves are not needed to test the tabs
vi.mock("@minerva/lib-web-components", () => ({}));

beforeAll(setupI18n);
beforeEach(() => localStorage.clear());

const Search: React.FC = () => (
  <output aria-label="query">{useLocation().search}</output>
);

const renderPage = (url = "/button") => {
  const router = createMemoryRouter(
    [
      {
        path: "/button",
        element: (
          <>
            <DocPage id="button" />
            <Search />
          </>
        ),
      },
    ],
    { initialEntries: [url] },
  );
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

const tabs = () => within(screen.getByRole("tablist", { name: "Framework" }));

describe("React / Web Components tabs", () => {
  it("is a segmented control switching the page content", async () => {
    const user = userEvent.setup();
    renderPage();
    expect(tabs().getByRole("tab", { name: "React" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "API" }),
    ).toBeInTheDocument();

    await user.click(tabs().getByRole("tab", { name: "Web Components" }));
    expect(tabs().getByRole("tab", { name: "Web Components" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("<minerva-button>");
    expect(screen.getByRole("status", { name: "query" })).toHaveTextContent(
      "?framework=wc",
    );

    // keyboard: arrows move between the two tabs
    await user.keyboard("{ArrowLeft}");
    expect(tabs().getByRole("tab", { name: "React" })).toHaveFocus();
    expect(tabs().getByRole("tab", { name: "React" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("remembers the last framework across pages and visits", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPage();
    await user.click(tabs().getByRole("tab", { name: "Web Components" }));
    expect(localStorage.getItem("minerva-docs-framework")).toBe("wc");
    unmount();

    renderPage();
    expect(tabs().getByRole("tab", { name: "Web Components" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("lets ?framework= in the URL win over the stored choice", () => {
    localStorage.setItem("minerva-docs-framework", "wc");
    renderPage("/button?framework=react");
    expect(tabs().getByRole("tab", { name: "React" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
