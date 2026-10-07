// ThemeProvider, plus its ConfigProvider integration (palette, persistence,
// one source of truth).
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { dark, githubDark, light } from "@minerva/core";
import { mockColorScheme } from "../test-utils/matchMedia";

const root = document.documentElement;
const cssVar = (name: string) => root.style.getPropertyValue(`--${name}`);
const clearCookies = () => {
  document.cookie = "theme=; max-age=0; path=/";
  document.cookie = "palette=; max-age=0; path=/";
};

afterEach(() => {
  clearCookies();
  vi.restoreAllMocks();
  root.removeAttribute("style");
  delete root.dataset.theme;
  delete root.dataset.palette;
});

function ThemeHarness() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <div>
      <button
        type="button"
        data-theme-value={theme}
        data-resolved-theme={resolvedTheme}
        data-palette={palette ?? "none"}
        onClick={() => setTheme("dark")}
      >
        dark
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        system
      </button>
      <button type="button" onClick={() => setPalette("tech")}>
        tech
      </button>
      <button type="button" onClick={() => setPalette(null)}>
        no palette
      </button>
    </div>
  );
}

const harness = () => screen.getByRole("button", { name: "dark" });

describe("ThemeProvider", () => {
  it.each([undefined, "obsolete"])(
    "keeps the application defaults for cookie %s",
    (value) => {
      if (value) {
        document.cookie = `theme=${value}; path=/`;
        document.cookie = `palette=${value}; path=/`;
      }
      render(
        <ThemeProvider defaultTheme="dark" defaultPalette="graphite">
          <ThemeHarness />
        </ThemeProvider>,
      );
      expect(root.dataset.theme).toBe("dark");
      expect(root.dataset.palette).toBe("graphite");
    },
  );

  it("keeps native browser controls in sync with the resolved theme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light" disableStorage>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(root.dataset.theme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
    await user.click(harness());
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
  });

  it("updates resolvedTheme when the system preference changes", () => {
    const scheme = mockColorScheme(false);
    render(
      <ThemeProvider defaultTheme="system" disableStorage>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(harness().dataset.resolvedTheme).toBe("light");
    expect(harness().dataset.themeValue).toBe("system");
    act(() => scheme.setDark(true));
    expect(harness().dataset.resolvedTheme).toBe("dark");
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
  });

  it("restores the cookies after hydration", () => {
    document.cookie = "theme=dark; path=/";
    document.cookie = "palette=cool; path=/";
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(harness().dataset.themeValue).toBe("dark");
    expect(harness().dataset.palette).toBe("cool");
    expect(root.dataset.palette).toBe("cool");
  });

  it("restores a system cookie", () => {
    mockColorScheme(true);
    document.cookie = "theme=system; path=/";
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(harness().dataset.themeValue).toBe("system");
    expect(root.dataset.theme).toBe("dark");
  });

  it("writes the cookies on change, and clears the palette cookie", async () => {
    const user = userEvent.setup();
    const onThemeChange = vi.fn();
    const onPaletteChange = vi.fn();
    render(
      <ThemeProvider
        defaultTheme="light"
        onThemeChange={onThemeChange}
        onPaletteChange={onPaletteChange}
      >
        <ThemeHarness />
      </ThemeProvider>,
    );
    await user.click(harness());
    await user.click(screen.getByRole("button", { name: "tech" }));
    expect(document.cookie).toContain("theme=dark");
    expect(document.cookie).toContain("palette=tech");
    expect(onThemeChange).toHaveBeenLastCalledWith("dark");
    expect(onPaletteChange).toHaveBeenLastCalledWith("tech");
    await user.click(screen.getByRole("button", { name: "system" }));
    expect(document.cookie).toContain("theme=system");
    expect(onThemeChange).toHaveBeenLastCalledWith("system");
    await user.click(screen.getByRole("button", { name: "no palette" }));
    expect(document.cookie).not.toContain("palette=");
    expect(root.dataset.palette).toBeUndefined();
    expect(onPaletteChange).toHaveBeenLastCalledWith(null);
  });

  it("does not touch cookies with disableStorage", async () => {
    const user = userEvent.setup();
    document.cookie = "theme=dark; path=/";
    render(
      <ThemeProvider defaultTheme="light" disableStorage>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(harness().dataset.themeValue).toBe("light");
    await user.click(screen.getByRole("button", { name: "tech" }));
    expect(document.cookie).not.toContain("palette=tech");
  });

  it("throws a clear error outside a provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/);
  });
});

describe("ConfigProvider palettes (single source of truth)", () => {
  const Show = () => {
    const { mode, resolvedMode, palette } = useConfig();
    return (
      <output data-testid="config">{`${mode}|${resolvedMode}|${palette}`}</output>
    );
  };

  it("applies a palette through data attributes and drops inline theme variables", () => {
    mockColorScheme(false);
    const { rerender } = render(
      <ConfigProvider theme="dark">
        <Show />
      </ConfigProvider>,
    );
    expect(cssVar("background-color")).toBe(dark["background-color"]);
    expect(root.dataset.palette).toBeUndefined();

    rerender(
      <ConfigProvider theme="dark" palette="tech">
        <Show />
      </ConfigProvider>,
    );
    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.palette).toBe("tech");
    expect(cssVar("background-color")).toBe("");
    expect(screen.getByTestId("config")).toHaveTextContent("dark|dark|tech");

    rerender(
      <ConfigProvider theme="light" palette={null}>
        <Show />
      </ConfigProvider>,
    );
    expect(root.dataset.palette).toBeUndefined();
    expect(cssVar("background-color")).toBe(light["background-color"]);
  });

  it("ignores the palette for non-mode themes (github-dark, custom objects)", () => {
    const { rerender } = render(
      <ConfigProvider theme="github-dark" palette="cool">
        <Show />
      </ConfigProvider>,
    );
    expect(root.dataset.palette).toBeUndefined();
    expect(root.dataset.theme).toBe("dark");
    expect(cssVar("background-color")).toBe(githubDark["background-color"]);
    expect(screen.getByTestId("config")).toHaveTextContent(
      "undefined|dark|cool",
    );

    rerender(
      <ConfigProvider theme={{ ...light, "primary-color": "#000" }}>
        <Show />
      </ConfigProvider>,
    );
    expect(root.dataset.theme).toBeUndefined();
    expect(root.style.colorScheme).toBe("");
    expect(cssVar("primary-color")).toBe("#000");
  });

  it("resolves { light, dark } pairs to the system mode", () => {
    mockColorScheme(true);
    render(
      <ConfigProvider theme={{ light, dark }} palette="editorial">
        <Show />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("config")).toHaveTextContent(
      "system|dark|editorial",
    );
    // pairs carry their own tokens: no palette attribute
    expect(root.dataset.palette).toBeUndefined();
  });

  it('accepts "system" as an alias of "auto"', () => {
    mockColorScheme(true);
    render(
      <ConfigProvider theme="system">
        <Show />
      </ConfigProvider>,
    );
    expect(root.dataset.theme).toBe("dark");
    expect(cssVar("background-color")).toBe(dark["background-color"]);
  });

  it("does not persist custom theme objects to the cookie", () => {
    const Setter = () => {
      const { setTheme } = useConfig();
      return (
        <button type="button" onClick={() => setTheme?.({ ...light })}>
          custom
        </button>
      );
    };
    render(
      <ConfigProvider persist theme="light">
        <Setter />
      </ConfigProvider>,
    );
    act(() => screen.getByRole("button").click());
    expect(document.cookie).not.toContain("theme=");
  });
});
