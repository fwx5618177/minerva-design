// `primaryColor`: a brand color that keeps the explicit light / dark mode
// semantics (data-theme, ThemeToggle) and recomputes the primary tokens.
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { mockColorScheme } from "../test-utils/matchMedia";

const html = document.documentElement;
const htmlVar = (name: string) => html.style.getPropertyValue(`--${name}`);
const brandSheet = () =>
  document.querySelector<HTMLStyleElement>("style[data-minerva-primary-color]");
const scopeOf = (element: HTMLElement) =>
  element.closest<HTMLElement>("[data-minerva-theme-scope]");

const ShowConfig = ({ id = "config" }: { id?: string }) => {
  const { mode, resolvedMode, primaryColor } = useConfig();
  return (
    <output data-testid={id}>
      {[
        mode ?? "-",
        resolvedMode ?? "-",
        primaryColor ? `${primaryColor.light}/${primaryColor.dark}` : "none",
      ].join("|")}
    </output>
  );
};

const clearCookies = () => {
  for (const name of ["theme", "palette"]) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
};

beforeEach(() => {
  mockColorScheme(false);
});

afterEach(() => {
  vi.restoreAllMocks();
  clearCookies();
  html.removeAttribute("style");
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
});

describe("ConfigProvider primaryColor", () => {
  it("keeps an explicit light mode and applies the brand color", () => {
    render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "light");
    expect(htmlVar("primary-color")).toBe("#4f46e5");
    expect(htmlVar("primary-color-hover")).toContain("var(--primary-color)");
    expect(htmlVar("primary-color-subtle")).toContain("var(--primary-color)");
    expect(htmlVar("focus-ring-color")).toContain("var(--primary-color)");
    expect(screen.getByTestId("config")).toHaveTextContent(
      "light|light|#4f46e5/#7b85f2",
    );
  });

  it("derives a lighter brand color for an explicit dark mode", () => {
    render(
      <ConfigProvider theme="dark" primaryColor="#4f46e5">
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    expect(screen.getByTestId("config")).toHaveTextContent("dark|dark|");
  });

  it("uses the given dark value of a { light, dark } pair", () => {
    render(
      <ConfigProvider
        theme="dark"
        primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}
      >
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#818cf8");
    expect(screen.getByTestId("config")).toHaveTextContent(
      "dark|dark|#4f46e5/#818cf8",
    );
  });

  it("follows the system scheme with theme='system'", () => {
    mockColorScheme(true);
    render(
      <ConfigProvider theme="system" primaryColor="#4f46e5">
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    expect(screen.getByTestId("config")).toHaveTextContent("system|dark|");
  });

  it("renders a style sheet with both modes keyed on data-theme", () => {
    render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <span />
      </ConfigProvider>,
    );
    const css = brandSheet()?.textContent ?? "";
    expect(css).toContain(":root:not([data-theme=dark])");
    expect(css).toContain("--primary-color:#4f46e5");
    expect(css).toContain(":root[data-theme=dark]");
    expect(css).toContain("--primary-color:#7b85f2");
  });

  it("does not render a style sheet without a brand color", () => {
    render(
      <ConfigProvider theme="light">
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(brandSheet()).toBeNull();
    expect(screen.getByTestId("config")).toHaveTextContent("light|light|none");
  });

  it("stays explicit when ThemeToggle switches the mode", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" primaryColor="#4f46e5">
        <ThemeToggle />
        <ShowConfig />
      </ThemeProvider>,
    );
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    expect(screen.getByTestId("config")).toHaveTextContent("dark|dark|");
    await user.click(screen.getByRole("button", { name: "Light" }));
    expect(html).toHaveAttribute("data-theme", "light");
    expect(htmlVar("primary-color")).toBe("#4f46e5");
  });

  it("wins over the palette's primary color", () => {
    render(
      <ConfigProvider theme="light" palette="tech" primaryColor="#4f46e5">
        <span />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-palette", "tech");
    expect(htmlVar("primary-color")).toBe("#4f46e5");
    // the palette's other tokens still come from its stylesheet
    expect(htmlVar("background-color")).toBe("");
  });

  it("keeps the own accent color of a palette that has one", () => {
    render(
      <ConfigProvider theme="light" palette="editorial" primaryColor="#4f46e5">
        <span />
      </ConfigProvider>,
    );
    expect(htmlVar("primary-color")).toBe("#4f46e5");
    expect(htmlVar("accent-color")).toBe("");
  });

  it("follows prop updates and cleans <html> up on unmount", () => {
    const { rerender, unmount } = render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <span />
      </ConfigProvider>,
    );
    rerender(
      <ConfigProvider theme="light" primaryColor="#0d9488">
        <span />
      </ConfigProvider>,
    );
    expect(htmlVar("primary-color")).toBe("#0d9488");
    rerender(
      <ConfigProvider theme="light">
        <span />
      </ConfigProvider>,
    );
    expect(htmlVar("primary-color")).not.toBe("#0d9488");
    expect(brandSheet()).toBeNull();
    unmount();
    expect(htmlVar("primary-color")).toBe("");
  });

  it("ignores an invalid color with a dev warning (once)", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(
      <ConfigProvider theme="light" primaryColor="not-a-color">
        <ShowConfig />
      </ConfigProvider>,
    );
    rerender(
      <ConfigProvider theme="light" primaryColor="not-a-color">
        <ShowConfig />
      </ConfigProvider>,
    );
    const warnings = error.mock.calls.filter(([message]) =>
      String(message).includes("primaryColor"),
    );
    expect(warnings).toHaveLength(1);
    expect(String(warnings[0][0])).toContain("not-a-color");
    expect(screen.getByTestId("config")).toHaveTextContent("light|light|none");
    expect(brandSheet()).toBeNull();
  });
});

describe("nested ConfigProvider primaryColor", () => {
  it("scopes a nested brand color to its subtree", () => {
    render(
      <ConfigProvider theme="dark" primaryColor="#4f46e5">
        <ShowConfig id="outer" />
        <ConfigProvider primaryColor="#0d9488">
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    const inner = screen.getByTestId("inner");
    const scope = scopeOf(inner);
    expect(scope).not.toBeNull();
    expect(scope).toHaveAttribute("data-theme", "dark");
    expect(scope!.style.getPropertyValue("--primary-color")).not.toBe("");
    expect(scope!.style.getPropertyValue("--primary-color")).not.toBe(
      "#7b85f2",
    );
    expect(inner).toHaveTextContent("dark|dark|#0d9488/");
    expect(scopeOf(screen.getByTestId("outer"))).toBeNull();
    // only the root renders the style sheet
    expect(
      document.querySelectorAll("style[data-minerva-primary-color]"),
    ).toHaveLength(1);
  });

  it("inherits the brand color in a nested theme override", () => {
    render(
      <ConfigProvider theme="dark" primaryColor="#4f46e5">
        <ConfigProvider theme="light">
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    const scope = scopeOf(screen.getByTestId("inner"))!;
    expect(scope).toHaveAttribute("data-theme", "light");
    expect(scope.style.getPropertyValue("--primary-color")).toBe("#4f46e5");
    expect(screen.getByTestId("inner")).toHaveTextContent(
      "light|light|#4f46e5/#7b85f2",
    );
  });

  it("resets to the theme's own primary color with null", () => {
    render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <ConfigProvider primaryColor={null}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    const scope = scopeOf(screen.getByTestId("inner"))!;
    expect(scope.style.getPropertyValue("--primary-color")).not.toBe("#4f46e5");
    expect(screen.getByTestId("inner")).toHaveTextContent("light|light|none");
  });

  it("applies the scoped brand color to portalled content", async () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider primaryColor="#4f46e5">
          <span />
        </ConfigProvider>
      </ConfigProvider>,
    );
    await act(async () => {});
    const host = document.querySelector<HTMLElement>(
      "[data-minerva-portal-host]",
    );
    expect(host?.style.getPropertyValue("--primary-color")).toBe("#4f46e5");
  });
});
