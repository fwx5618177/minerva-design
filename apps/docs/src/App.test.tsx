// @vitest-environment happy-dom
// E2E-style flow through the real app router (hash routes, lazy pages,
// layout, search, theme), driven only with user-event.
import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import { setupI18n } from "./test/utils";

// Registering every custom element is not needed for the flow
vi.mock("minerva-design/web-components", () => ({}));

beforeAll(async () => {
  window.location.hash = "#/";
  localStorage.clear();
  await setupI18n();
});

// Routes lazy-load their page module and per-page locale chunk; CI runs the
// suite under coverage on slower machines, so route changes get a generous wait.
const ROUTE_TIMEOUT = 15_000;
const h1 = () =>
  screen.findByRole("heading", { level: 1 }, { timeout: ROUTE_TIMEOUT });
const pageHeading = (name: string) =>
  screen.findByRole("heading", { level: 1, name }, { timeout: ROUTE_TIMEOUT });

describe("docs site", () => {
  it(
    "home → component page → framework selector → search → dark mode",
    { timeout: 60_000 },
    async () => {
      const user = userEvent.setup();
      const { default: App } = await import("./App");
      render(<App />);

      // Landing page, with the site chrome
      expect(await h1()).toHaveTextContent("Interfaces that feel finished.");
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Skip to content" }),
      ).toHaveAttribute("href", "#main-content");

      // → component page
      await user.click(screen.getByRole("link", { name: "Browse components" }));
      expect(
        await pageHeading(i18n.t("docs.button.title")),
      ).toBeInTheDocument();
      expect(window.location.hash).toBe("#/button");
      const sidebar = screen.getByRole("navigation", { name: "Documentation" });
      expect(
        within(sidebar).getByRole("link", {
          name: i18n.t("docs.button.title"),
        }),
      ).toHaveAttribute("aria-current", "page");
      // "On this page" lists the page sections
      const toc = await screen.findByRole(
        "navigation",
        { name: "On this page" },
        { timeout: ROUTE_TIMEOUT },
      );
      expect(
        await within(toc).findByRole(
          "link",
          { name: "API" },
          { timeout: ROUTE_TIMEOUT },
        ),
      ).toBeInTheDocument();

      // → framework selector: Vue (the choice follows the reader)
      await user.click(screen.getByRole("tab", { name: "Vue" }));
      // the native Vue renderer (minerva-design/vue)
      expect(screen.getByRole("tabpanel")).toHaveTextContent(
        'from "minerva-design/vue"',
      );
      expect(window.location.hash).toBe("#/button?framework=vue");

      // → search (⌘K) to another page
      await user.keyboard("{Meta>}k{/Meta}");
      const input = await screen.findByRole("combobox");
      await user.type(input, "Pagination");
      await user.keyboard("{Enter}");
      expect(
        await pageHeading(i18n.t("docs.pagination.title")),
      ).toBeInTheDocument();
      expect(window.location.hash).toMatch(/^#\/pagination/);
      // the framework chosen on the button page is kept
      expect(screen.getByRole("tab", { name: "Vue" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      // previous / next pages
      expect(
        screen.getByRole("navigation", { name: "Pagination" }),
      ).toBeInTheDocument();

      // → dark mode
      await user.click(screen.getByRole("button", { name: /^Theme:/ }));
      await user.click(
        await screen.findByRole("menuitemradio", { name: "Dark" }),
      );
      expect(document.documentElement).toHaveAttribute("data-theme", "dark");
      expect(localStorage.getItem("minerva-docs-theme")).toBe("dark");

      // the header search button opens the palette too
      await user.click(
        screen.getByRole("button", { name: "Search documentation" }),
      );
      expect(await screen.findByRole("dialog")).toBeInTheDocument();
      await user.keyboard("{Escape}");

      // unknown routes show the 404 page
      act(() => {
        window.history.pushState(null, "", "#/does-not-exist");
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
      expect(
        await screen.findByRole(
          "heading",
          { name: "This page could not be found." },
          { timeout: ROUTE_TIMEOUT },
        ),
      ).toBeInTheDocument();
    },
  );
});
