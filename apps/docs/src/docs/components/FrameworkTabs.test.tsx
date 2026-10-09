// @vitest-environment happy-dom
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import DocPage from "./DocPage";
import { SiteProviders, setupI18n } from "../../test/utils";
import { FRAMEWORKS } from "../frameworks";
import { resetStoredFramework } from "../frameworks/useFramework";

// The custom elements themselves are not needed to test the selector
vi.mock("minerva-design/web-components", () => ({}));

beforeAll(setupI18n);
beforeEach(() => {
  localStorage.clear();
  resetStoredFramework();
});

const Search: React.FC = () => (
  <output aria-label="query">{useLocation().search}</output>
);

const renderPage = (url = "/button", id = "button") => {
  const router = createMemoryRouter(
    [
      {
        path: `/${id}`,
        element: (
          <>
            <DocPage id={id} />
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
const selected = (name: string) =>
  expect(tabs().getByRole("tab", { name })).toHaveAttribute(
    "aria-selected",
    "true",
  );

describe("global framework selector", () => {
  it("offers React, Vue, Angular, Svelte, Solid and HTML", () => {
    renderPage();
    expect(
      tabs()
        .getAllByRole("tab")
        .map((tab) => tab.textContent),
    ).toEqual([
      "React",
      "React Native",
      "Vue",
      "Angular",
      "Svelte",
      "Solid",
      "HTML",
    ]);
    expect(FRAMEWORKS.map((fw) => fw.id)).toEqual([
      "react",
      "react-native",
      "vue",
      "angular",
      "svelte",
      "solid",
      "html",
    ]);
    selected("React");
  });

  it("React shows the component import (no stylesheet) and the props", () => {
    renderPage();
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent('import { Button } from "minerva-design";');
    expect(panel).not.toHaveTextContent("style.css");
    const note = within(panel).getByRole("link", { name: "Installation" });
    expect(note).toHaveAttribute("href", "/installation#global-stylesheet");
    expect(
      screen.getByRole("heading", { level: 2, name: "API" }),
    ).toBeInTheDocument();
  });

  it("Vue shows the native renderer: import, live Vue demos with their SFC source, the Vue API", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(tabs().getByRole("tab", { name: "Vue" }));
    selected("Vue");
    expect(screen.getByRole("status", { name: "query" })).toHaveTextContent(
      "?framework=vue",
    );
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent(
      'import { Button } from "minerva-design/vue";',
    );
    expect(panel).not.toHaveTextContent("isCustomElement");
    expect(screen.queryByTestId("native-planned")).toBeNull();
    // the demos load lazily: real Vue components, their single-file source
    expect(
      await within(panel).findByRole("heading", {
        level: 3,
        name: "Basic usage",
      }),
    ).toBeInTheDocument();
    expect(panel).toHaveTextContent("<script setup");
    expect(panel).toHaveTextContent('from "minerva-design/vue"');
    expect(
      await within(panel).findByRole(
        "button",
        { name: "Save" },
        { timeout: 10_000 },
      ),
    ).toHaveAttribute("data-minerva", "button");
    // API tables generated from the Vue component types
    expect(
      await within(panel).findByRole("heading", { level: 3, name: "<Button>" }),
    ).toBeInTheDocument();
    expect(within(panel).getAllByText("@click").length).toBeGreaterThan(0);
    expect(within(panel).getByText("#start-icon")).toBeInTheDocument();
    expect(localStorage.getItem("minerva-docs-framework")).toBe("vue");
  }, 15_000);

  it.each([
    [
      "Angular",
      "angular",
      "src/main.ts",
      "CUSTOM_ELEMENTS_SCHEMA",
      "@Component",
    ],
    [
      "Svelte",
      "svelte",
      "src/main.ts",
      "minerva-design/web-components/svelte",
      ".svelte",
    ],
    [
      "Solid",
      "solid",
      "src/index.tsx",
      "minerva-design/web-components/solid",
      "solid-js",
    ],
    ["HTML", "html", "index.html", "cdn/minerva.js", '<script type="module">'],
  ])(
    "%s shows its setup, the generated demo sources and the element API",
    async (label, id, file, setup, source) => {
      const user = userEvent.setup();
      renderPage();
      await user.click(tabs().getByRole("tab", { name: label }));
      selected(label);
      expect(screen.getByRole("status", { name: "query" })).toHaveTextContent(
        `?framework=${id}`,
      );
      const panel = screen.getByRole("tabpanel");
      expect(
        within(panel).getByRole("heading", { level: 2, name: "Setup" }),
      ).toBeInTheDocument();
      expect(panel).toHaveTextContent(file);
      expect(panel).toHaveTextContent(setup);
      expect(panel).toHaveTextContent(
        'import "minerva-design/web-components/button"',
      );
      // the demos load lazily, with their source in the framework's idiom
      expect(
        await within(panel).findByRole("heading", {
          level: 3,
          name: "Basic usage",
        }),
      ).toBeInTheDocument();
      expect(panel).toHaveTextContent(source);
      expect(
        within(panel).getByRole("heading", { level: 2, name: "API" }),
      ).toBeInTheDocument();
      expect(localStorage.getItem("minerva-docs-framework")).toBe(id);
    },
  );

  it.each([
    ["Vue", false],
    ["Angular", true],
    ["Svelte", false],
    ["HTML", false],
  ])(
    "%s is labelled as using the Web Components until its native renderer lands: %s",
    async (label, planned) => {
      const user = userEvent.setup();
      renderPage();
      const tab = tabs().getByRole("tab", { name: label });
      expect(tab.getAttribute("title")).toBe(
        planned
          ? `${label} Web Components examples (native subset available)`
          : null,
      );
      await user.click(tab);
      const note = screen.queryByTestId("native-planned");
      if (!planned) {
        expect(note).toBeNull();
        return;
      }
      expect(note).toHaveTextContent(
        `${label} Web Components examples (native subset available)`,
      );
      expect(
        within(note!).getByRole("link", { name: "Platform support" }),
      ).toHaveAttribute("href", "/platform-support");
    },
  );

  it("moves between frameworks with the arrow keys", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(tabs().getByRole("tab", { name: "Vue" }));
    await user.keyboard("{ArrowRight}");
    expect(tabs().getByRole("tab", { name: "Angular" })).toHaveFocus();
    selected("Angular");
    await user.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
    selected("React");
  });

  it("remembers the framework across pages and visits", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPage();
    await user.click(tabs().getByRole("tab", { name: "Svelte" }));
    unmount();

    renderPage("/tag", "tag");
    selected("Svelte");
  });

  it("lets ?framework= win over the stored choice and persists it", () => {
    localStorage.setItem("minerva-docs-framework", "vue");
    renderPage("/button?framework=angular");
    selected("Angular");
    expect(localStorage.getItem("minerva-docs-framework")).toBe("angular");
  });

  it("maps the old ?framework=wc and stored 'wc' to HTML", () => {
    renderPage("/button?framework=wc");
    selected("HTML");
  });

  it("falls back to React for unknown values", () => {
    localStorage.setItem("minerva-docs-framework", "cobol");
    renderPage("/button?framework=nope");
    selected("React");
  });

  it("is not shown on pages without a Web Component counterpart", () => {
    renderPage("/hooks", "hooks");
    expect(
      screen.queryByRole("tablist", { name: "Framework" }),
    ).not.toBeInTheDocument();
  });
});
