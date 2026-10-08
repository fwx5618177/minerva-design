// @vitest-environment happy-dom
// Installation page: the global stylesheet section (#global-stylesheet),
// linked from the "Requires the global stylesheet" note of every component
// page, documents the one-time import for each kind of app entry.
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import InstallationDoc from "./pages/installation";
import { SiteProviders, setupI18n } from "../test/utils";

vi.mock("@minerva/lib-web-components", () => ({}));

beforeAll(setupI18n);

const renderPage = () => {
  const router = createMemoryRouter(
    [{ path: "/installation", element: <InstallationDoc /> }],
    { initialEntries: ["/installation"] },
  );
  return render(
    <SiteProviders>
      <RouterProvider router={router} />
    </SiteProviders>,
  );
};

/** The section of the #global-stylesheet heading */
const section = async () => {
  const heading = await screen.findByRole("heading", {
    level: 2,
    name: "Import the global stylesheet once",
  });
  expect(heading).toHaveAttribute("id", "global-stylesheet");
  return heading.closest("section")!;
};

const codeOf = (root: HTMLElement) =>
  Array.from(root.querySelectorAll("pre"), (pre) => pre.textContent ?? "");

describe("installation: global stylesheet", () => {
  it("has a #global-stylesheet section labelled by its heading", async () => {
    renderPage();
    const root = await section();
    expect(root).toHaveAttribute("aria-labelledby", "global-stylesheet");
    expect(root).toHaveTextContent(
      "Import it exactly once, in your application entry",
    );
  });

  it("shows the entry snippets: Vite, Next.js, Web Components", async () => {
    renderPage();
    const root = await section();
    const view = within(root);
    for (const name of [
      "React with Vite: src/main.tsx",
      "Next.js (App Router): app/layout.tsx",
      "Web Components: src/main.ts",
    ]) {
      expect(view.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
    const code = codeOf(root);
    const vite = code.find((c) => c.includes("src/main.tsx —"));
    expect(vite).toContain('import "@minerva/lib-core/style.css";');
    expect(vite).toContain("createRoot(");
    const next = code.find((c) => c.includes("app/layout.tsx"));
    expect(next).toContain('import "@minerva/lib-core/style.css";');
    expect(next).toContain("export default function RootLayout");
    const wc = code.find((c) => c.includes("src/main.ts —"));
    expect(wc).toContain('import "@minerva/lib-web-components";');
    expect(wc).toContain('import "@minerva/lib-web-components/tokens.css";');
    expect(
      view.getByText(/Vite bundles CSS imported from JavaScript/),
    ).toBeInTheDocument();
  });

  it("component files import components only; per-component CSS is optional", async () => {
    renderPage();
    const root = await section();
    const code = codeOf(root);
    expect(code).toContainEqual(
      expect.stringContaining('import { Tag } from "@minerva/lib-core";'),
    );
    expect(
      within(root).getByRole("heading", {
        level: 3,
        name: "Optional: per-component stylesheets",
      }),
    ).toHaveAttribute("id", "per-component-styles");
    expect(code).toContainEqual(
      expect.stringContaining('import "@minerva/lib-core/styles/button.css";'),
    );
  });

  it("the component-page note is translated in every locale", () => {
    for (const lng of ["en", "zh", "ja", "fr"]) {
      for (const key of [
        "doc.requiresStylesheet",
        "doc.requiresStylesheetLink",
      ]) {
        expect(i18n.exists(key, { lng }), `${lng}: ${key}`).toBe(true);
      }
    }
    expect(i18n.t("doc.requiresStylesheet", { lng: "en" })).toBe(
      "Requires the global stylesheet — see",
    );
    expect(i18n.t("doc.requiresStylesheetLink", { lng: "en" })).toBe(
      "Installation",
    );
  });
});
