// @vitest-environment happy-dom
// First paint is never blank: index.html ships a static shell, and while a
// route's chunk loads the layout shows the skeleton of that kind of page.
import React, { lazy } from "react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Layout from "@layout/Layout";
import PageSkeleton from "./PageSkeleton";
import { SiteProviders, setupI18n } from "../test/utils";

vi.mock("@minerva/lib-web-components", () => ({}));

beforeAll(setupI18n);

// A route chunk that never finishes loading
const Pending = lazy(() => new Promise<never>(() => {}));

const renderAt = (path: string) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Pending /> },
          { path: "button", element: <Pending /> },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

describe("PageSkeleton", () => {
  it("announces the loading state and hides the placeholder shapes", () => {
    render(
      <SiteProviders>
        <PageSkeleton variant="doc" />
      </SiteProviders>,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-busy", "true");
    expect(status).toHaveTextContent("Loading…");
    expect(status.querySelector("[aria-hidden]")!.children.length).toBe(9);
  });

  it("shows the landing page skeleton inside the site chrome while the home chunk loads", async () => {
    renderAt("/");
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-page-skeleton", "home");
    // header and footer are already painted around it
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(within(screen.getByRole("main")).getByRole("status")).toBe(status);
  });

  it("shows the documentation skeleton next to the sidebar on docs pages", async () => {
    renderAt("/button");
    const status = await screen.findByRole("status");
    expect(status).toHaveAttribute("data-page-skeleton", "doc");
    expect(
      screen.getByRole("navigation", { name: "Documentation" }),
    ).toBeInTheDocument();
  });
});

describe("index.html boot shell", () => {
  const html = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../index.html"),
    "utf8",
  );
  const doc = new DOMParser().parseFromString(html, "text/html");

  it("paints a header and a page skeleton inside #root before any JS runs", () => {
    const shell = doc.querySelector("#root > [data-boot-shell]");
    expect(shell).not.toBeNull();
    expect(shell!.getAttribute("role")).toBe("status");
    expect(shell!.querySelector(".boot-header")!.textContent).toContain(
      "Minerva UI",
    );
    expect(shell!.querySelectorAll(".boot-bone").length).toBeGreaterThan(2);
  });

  it("applies the stored theme before the stylesheets load", () => {
    const script = [...doc.head.querySelectorAll("script:not([src])")]
      .map((node) => node.textContent ?? "")
      .find((code) => code.includes("minerva-docs-theme"));
    expect(script).toBeDefined();
    const style = doc.head.querySelector("style")!.textContent!;
    expect(style).toMatch(/html\[data-theme="dark"\]\s*{[^}]*background: #000/);

    const run = (stored: string | null, prefersDark: boolean, hash = "") => {
      const root = document.createElement("html");
      const fake = {
        document: { documentElement: root },
        localStorage: { getItem: () => stored },
        location: { hash },
        window: { matchMedia: () => ({ matches: prefersDark }) },
      };
      new Function("document", "localStorage", "location", "window", script!)(
        fake.document,
        fake.localStorage,
        fake.location,
        fake.window,
      );
      return [root.getAttribute("data-theme"), root.getAttribute("data-boot")];
    };
    expect(run(null, true)).toEqual(["dark", "home"]);
    expect(run("auto", false, "#/")).toEqual(["light", "home"]);
    expect(run("light", true, "#/button")).toEqual(["light", "doc"]);
    expect(run("github-dark", false, "#/tabs?framework=wc")).toEqual([
      "dark",
      "doc",
    ]);
  });
});
