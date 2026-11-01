// `primaryColor` on the Taro ConfigProvider / ThemeProvider: brand tokens are
// written on the provider's root as concrete CSS variables, the mode stays
// explicit (data-theme / data-mode, ThemeToggle).
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ConfigProvider,
  Page,
  ThemeProvider,
  ThemeToggle,
  useThemeTokens,
} from "./index";

const roots = (container: HTMLElement) => [
  ...container.querySelectorAll<HTMLElement>(
    '[data-minerva="config-provider"]',
  ),
];
const cssVar = (element: HTMLElement, name: string) =>
  element.style.getPropertyValue(`--${name}`);

const ShowPrimary = ({ id }: { id: string }) => (
  <span data-testid={id}>{useThemeTokens().colors["primary-color"]}</span>
);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Taro primaryColor", () => {
  it("writes the brand tokens on the root and keeps the explicit mode", () => {
    const { container } = render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <ShowPrimary id="primary" />
      </ConfigProvider>,
    );
    const [root] = roots(container);
    expect(root).toHaveAttribute("data-theme", "light");
    expect(root).toHaveAttribute("data-mode", "light");
    expect(cssVar(root, "primary-color")).toBe("#4f46e5");
    const hover = cssVar(root, "primary-color-hover");
    expect(hover).not.toBe("");
    expect(hover).not.toContain("var(");
    expect(cssVar(root, "primary-color-subtle")).not.toBe("");
    expect(screen.getByTestId("primary")).toHaveTextContent("#4f46e5");
    // the other tokens still come from the token classes
    expect(cssVar(root, "background-color")).toBe("");
  });

  it("derives the dark value, and follows ThemeToggle", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="light" primaryColor="#4f46e5" disableStorage>
        <ThemeToggle />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Dark" }));
    const [root] = roots(container);
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(root).toHaveAttribute("data-theme", "dark");
    expect(root).toHaveAttribute("data-mode", "dark");
    expect(cssVar(root, "primary-color")).toBe("#7b85f2");
  });

  it("uses the dark value of a pair and wins over the palette", () => {
    const { container } = render(
      <ConfigProvider
        theme="dark"
        palette="tech"
        primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}
      >
        <span />
      </ConfigProvider>,
    );
    expect(cssVar(roots(container)[0], "primary-color")).toBe("#818cf8");
  });

  it("wins over a custom theme object's primary color", () => {
    const { container } = render(
      <ConfigProvider
        theme={{ "primary-color": "#e11d48" }}
        primaryColor="#4f46e5"
      >
        <span />
      </ConfigProvider>,
    );
    expect(cssVar(roots(container)[0], "primary-color")).toBe("#4f46e5");
  });

  it("is inherited by nested providers, scoped and reset by null", () => {
    const { container } = render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <ConfigProvider theme="dark">
          <ShowPrimary id="inherited" />
        </ConfigProvider>
        <ConfigProvider primaryColor="#0d9488">
          <ShowPrimary id="own" />
        </ConfigProvider>
        <ConfigProvider primaryColor={null}>
          <ShowPrimary id="reset" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    const [, inherited, own, reset] = roots(container);
    expect(cssVar(inherited, "primary-color")).toBe("#7b85f2");
    expect(cssVar(own, "primary-color")).toBe("#0d9488");
    // the theme's own primary color, restored over the inherited variables
    expect(cssVar(reset, "primary-color")).not.toBe("");
    expect(cssVar(reset, "primary-color")).not.toBe("#4f46e5");
    expect(screen.getByTestId("own")).toHaveTextContent("#0d9488");
  });

  it("ignores an invalid color with a development warning", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ConfigProvider theme="light" primaryColor="definitely-not-a-color">
        <span />
      </ConfigProvider>,
    );
    expect(cssVar(roots(container)[0], "primary-color")).toBe("");
    expect(
      error.mock.calls.some(([message]) =>
        String(message).includes("primaryColor"),
      ),
    ).toBe(true);
  });
});

// In mini-programs every page renders under its own root, outside the
// provider's element: Page re-applies the provider's token scope.
describe("Taro Page theme scope", () => {
  const page = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('[data-minerva="page"]')!;

  it("carries the brand tokens and token classes of the provider", () => {
    const { container } = render(
      <ConfigProvider theme="light" primaryColor="#4f46e5">
        <Page>content</Page>
      </ConfigProvider>,
    );
    const root = page(container);
    expect(root.className).toContain("mn-root");
    expect(root.className).toContain("mn-page");
    expect(cssVar(root, "primary-color")).toBe("#4f46e5");
    expect(cssVar(root, "primary-color-hover")).not.toBe("");
    // the default light theme keeps the page's own surface
    expect(root.style.backgroundColor).toBe("");
  });

  it("follows dark mode: dark classes, dark brand value and surface", () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark" primaryColor="#4f46e5" disableStorage>
        <Page>content</Page>
      </ThemeProvider>,
    );
    const root = page(container);
    expect(root.className).toContain("mn-theme-dark");
    expect(cssVar(root, "primary-color")).toBe("#7b85f2");
    expect(root.style.backgroundColor).toBe("var(--background-color)");
    expect(root.style.color).toBe("var(--text-color)");
  });

  it("is a plain page outside a provider", () => {
    const { container } = render(<Page maxWidth={600}>content</Page>);
    const root = page(container);
    expect(root.className).not.toContain("mn-root");
    expect(root.style.maxWidth).toBe("600px");
    expect(cssVar(root, "primary-color")).toBe("");
  });
});
