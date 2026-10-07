// Nested ConfigProviders: only the root provider owns <html> (attributes,
// inline tokens), the cookies and lib-core's global language. Nested ones
// inherit what they don't override and scope their overrides to the subtree.
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import { ThemeProvider } from "./ThemeProvider";
import i18n from "../config/i18n";
import useI18n from "../hooks/useI18n";
import { Modal } from "../components/Modal";
import { Tooltip } from "../components/Tooltip";
import { dark, githubDark, light } from "../styles/themes";
import { mockColorScheme } from "../test-utils/matchMedia";

const html = document.documentElement;

/** Everything a provider may write on <html> */
const htmlState = () => ({
  attributes: Object.fromEntries(
    [...html.attributes].map((attribute) => [attribute.name, attribute.value]),
  ),
});

const clearCookies = () => {
  for (const name of ["theme", "palette"]) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
};

const ShowConfig = ({ id }: { id: string }) => {
  const { theme, resolvedMode, palette, locale } = useConfig();
  const { t } = useI18n();
  return (
    <output data-testid={id}>
      {[
        typeof theme === "string" ? theme : "object",
        resolvedMode ?? "-",
        palette ?? "none",
        locale?.language,
        t("empty.description"),
      ].join("|")}
    </output>
  );
};

const scopeOf = (element: HTMLElement) =>
  element.closest<HTMLElement>("[data-minerva-theme-scope]");

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

describe("nested ConfigProvider", () => {
  it("does not modify <html> when mounted, updated or unmounted", () => {
    const { rerender } = render(
      <ConfigProvider theme="dark" palette="tech">
        <ConfigProvider locale={{ language: "zh" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(html).toHaveAttribute("data-palette", "tech");
    const rootState = htmlState();

    // nested overrides (theme object / palette / locale) never reach <html>
    rerender(
      <ConfigProvider theme="dark" palette="tech">
        <ConfigProvider theme={githubDark} palette={null}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(htmlState()).toEqual(rootState);
    rerender(
      <ConfigProvider theme="dark" palette="tech">
        <ConfigProvider theme="light" palette="editorial" persist>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(htmlState()).toEqual(rootState);

    // unmounting the nested provider leaves <html> as the root set it
    rerender(
      <ConfigProvider theme="dark" palette="tech">
        <span>no nested provider</span>
      </ConfigProvider>,
    );
    expect(htmlState()).toEqual(rootState);
    expect(document.cookie).not.toMatch(/(^|; )(theme|palette)=/);
  });

  it("inherits theme, palette and locale from its parent", () => {
    render(
      <ConfigProvider
        theme="dark"
        palette="graphite"
        locale={{ language: "fr" }}
      >
        <ConfigProvider>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("inner")).toHaveTextContent(
      "dark|dark|graphite|fr|Aucune donnée",
    );
    // nothing to scope: no wrapper element
    expect(scopeOf(screen.getByTestId("inner"))).toBeNull();
  });

  it("follows parent changes for the settings it does not override", () => {
    const { rerender } = render(
      <ConfigProvider theme="light" palette="tech">
        <ConfigProvider locale={{ language: "zh" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    rerender(
      <ConfigProvider theme="dark" palette="cool">
        <ConfigProvider locale={{ language: "zh" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("inner")).toHaveTextContent(
      "dark|dark|cool|zh|暂无数据",
    );
  });

  it("scopes a locale override to its subtree without touching the theme", () => {
    render(
      <ConfigProvider theme="light" palette="editorial">
        <ShowConfig id="outer" />
        <ConfigProvider locale={{ language: "ja" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("inner")).toHaveTextContent(
      "light|light|editorial|ja|データがありません",
    );
    expect(screen.getByTestId("outer")).toHaveTextContent(
      "light|light|editorial|en|No Data",
    );
    // the global language stays the root's, no theme wrapper is rendered
    expect(i18n.language).toBe("en");
    expect(scopeOf(screen.getByTestId("inner"))).toBeNull();
    expect(html).toHaveAttribute("data-palette", "editorial");
  });

  it("applies a theme / palette override to its subtree only", () => {
    render(
      <ConfigProvider theme="light" palette="editorial">
        <ShowConfig id="outer" />
        <ConfigProvider theme="dark">
          <ShowConfig id="dark" />
        </ConfigProvider>
        <ConfigProvider palette={null}>
          <ShowConfig id="plain" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    // theme override: inherits the palette, palette tokens come from the CSS
    const darkScope = scopeOf(screen.getByTestId("dark"))!;
    expect(screen.getByTestId("dark")).toHaveTextContent(
      "dark|dark|editorial|en",
    );
    expect(darkScope).toHaveAttribute("data-theme", "dark");
    expect(darkScope).toHaveAttribute("data-palette", "editorial");
    expect(darkScope.style.display).toBe("contents");
    expect(darkScope.style.colorScheme).toBe("dark");
    expect(darkScope.style.getPropertyValue("--background-color")).toBe("");

    // palette removed: Minerva's light tokens as inline variables
    const plainScope = scopeOf(screen.getByTestId("plain"))!;
    expect(plainScope).toHaveAttribute("data-theme", "light");
    expect(plainScope).not.toHaveAttribute("data-palette");
    expect(plainScope.style.getPropertyValue("--background-color")).toBe(
      light["background-color"],
    );

    // the rest of the page and <html> keep the root theme
    expect(scopeOf(screen.getByTestId("outer"))).toBeNull();
    expect(html).toHaveAttribute("data-theme", "light");
    expect(html).toHaveAttribute("data-palette", "editorial");
    expect(html.style.getPropertyValue("--background-color")).toBe("");
  });

  it("writes custom theme tokens on the scope element, not on <html>", () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme={{ ...dark, "primary-color": "#123456" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    const scope = scopeOf(screen.getByTestId("inner"))!;
    expect(scope.style.getPropertyValue("--primary-color")).toBe("#123456");
    // a custom object has no light / dark mode
    expect(scope).not.toHaveAttribute("data-theme");
    expect(html.style.getPropertyValue("--primary-color")).toBe(
      light["primary-color"],
    );
  });

  it("renders portalled content into a container with the scoped theme", () => {
    const { rerender } = render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark" palette="tech">
          <Modal open title="Scoped dialog">
            body
          </Modal>
        </ConfigProvider>
      </ConfigProvider>,
    );
    const dialog = screen.getByRole("dialog", { name: "Scoped dialog" });
    const host = scopeOf(dialog)!;
    expect(host).toHaveAttribute("data-minerva-portal-host");
    expect(host.parentElement).toBe(document.body);
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host).toHaveAttribute("data-palette", "tech");

    // the container follows the scoped theme
    rerender(
      <ConfigProvider theme="light">
        <ConfigProvider theme="github-dark">
          <Modal open title="Scoped dialog">
            body
          </Modal>
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(host).not.toHaveAttribute("data-palette");
    expect(host.style.getPropertyValue("--background-color")).toBe(
      githubDark["background-color"],
    );

    // ...and is removed with the provider
    rerender(
      <ConfigProvider theme="light">
        <span>closed</span>
      </ConfigProvider>,
    );
    expect(document.querySelector("[data-minerva-portal-host]")).toBeNull();
  });

  it("scopes createPortal-based overlays too (Tooltip / Popper)", () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <Tooltip content="Scoped tip" defaultOpen>
            <button type="button">Trigger</button>
          </Tooltip>
        </ConfigProvider>
      </ConfigProvider>,
    );
    const host = scopeOf(screen.getByRole("tooltip"))!;
    expect(host).toHaveAttribute("data-minerva-portal-host");
    expect(host).toHaveAttribute("data-theme", "dark");
    expect(host.style.getPropertyValue("--background-color")).toBe(
      dark["background-color"],
    );
  });

  it("keeps portals of unscoped providers on document.body", () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider locale={{ language: "fr" }}>
          <Modal open title="Plain dialog">
            body
          </Modal>
        </ConfigProvider>
      </ConfigProvider>,
    );
    const dialog = screen.getByRole("dialog", { name: "Plain dialog" });
    expect(scopeOf(dialog)).toBeNull();
    expect(document.querySelector("[data-minerva-portal-host]")).toBeNull();
    // the locale override still applies to portalled content
    expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();
  });

  it("delegates setTheme / setPalette to the parent for inherited settings", async () => {
    const user = userEvent.setup();
    const Controls = () => {
      const { setTheme, setPalette } = useConfig();
      return (
        <>
          <button type="button" onClick={() => setTheme?.("dark")}>
            dark
          </button>
          <button type="button" onClick={() => setPalette?.("cool")}>
            cool
          </button>
        </>
      );
    };
    render(
      <ConfigProvider theme="light" persist>
        <ShowConfig id="outer" />
        <ConfigProvider locale={{ language: "fr" }}>
          <Controls />
        </ConfigProvider>
      </ConfigProvider>,
    );
    await user.click(screen.getByRole("button", { name: "dark" }));
    await user.click(screen.getByRole("button", { name: "cool" }));
    expect(screen.getByTestId("outer")).toHaveTextContent("dark|dark|cool");
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(html).toHaveAttribute("data-palette", "cool");
    // the root still persists
    expect(document.cookie).toMatch(/(^|; )theme=dark/);
    expect(document.cookie).toMatch(/(^|; )palette=cool/);
  });

  it("keeps overridden settings local (no cookies, no <html> change)", async () => {
    const user = userEvent.setup();
    const onPaletteChange = vi.fn();
    const Controls = () => {
      const { setPalette } = useConfig();
      return (
        <button type="button" onClick={() => setPalette?.("graphite")}>
          graphite
        </button>
      );
    };
    render(
      <ConfigProvider theme="light" palette="tech" persist>
        <ShowConfig id="outer" />
        <ConfigProvider
          palette="editorial"
          persist
          onPaletteChange={onPaletteChange}
        >
          <Controls />
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    await user.click(screen.getByRole("button", { name: "graphite" }));
    expect(onPaletteChange).toHaveBeenCalledWith("graphite");
    expect(screen.getByTestId("inner")).toHaveTextContent(
      "light|light|graphite",
    );
    expect(screen.getByTestId("outer")).toHaveTextContent("light|light|tech");
    expect(scopeOf(screen.getByTestId("inner"))).toHaveAttribute(
      "data-palette",
      "graphite",
    );
    expect(html).toHaveAttribute("data-palette", "tech");
    expect(document.cookie).not.toMatch(/(^|; )palette=/);
  });

  it("treats a nested ThemeProvider the same way", () => {
    render(
      <ConfigProvider theme="dark" palette="tech">
        <ThemeProvider>
          <ShowConfig id="inherit" />
        </ThemeProvider>
        <ThemeProvider defaultTheme="light" defaultPalette={null}>
          <ShowConfig id="override" />
        </ThemeProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("inherit")).toHaveTextContent("dark|dark|tech");
    expect(scopeOf(screen.getByTestId("inherit"))).toBeNull();
    expect(screen.getByTestId("override")).toHaveTextContent(
      "light|light|none",
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(html).toHaveAttribute("data-palette", "tech");
    expect(document.cookie).not.toMatch(/(^|; )(theme|palette)=/);
  });
});

describe("root ConfigProvider cleanup", () => {
  it("restores <html> and the global language when it unmounts", () => {
    html.setAttribute("data-theme", "light");
    html.setAttribute("lang", "en");
    const before = htmlState();
    const { unmount } = render(
      <ConfigProvider theme="dark" palette="cool" locale={{ language: "ja" }}>
        <ShowConfig id="root" />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(html).toHaveAttribute("data-palette", "cool");
    expect(i18n.language).toBe("ja");

    unmount();
    expect(htmlState()).toEqual(before);
    expect(i18n.language).toBe("en");
    html.removeAttribute("lang");
  });

  it("removes the inline theme variables it wrote", () => {
    const { unmount } = render(
      <ConfigProvider theme="github-dark">
        <ShowConfig id="root" />
      </ConfigProvider>,
    );
    expect(html.style.getPropertyValue("--background-color")).toBe(
      githubDark["background-color"],
    );
    unmount();
    expect(html.style.getPropertyValue("--background-color")).toBe("");
    expect(html).not.toHaveAttribute("data-theme");
  });

  it("re-applies the root theme on <html> when the system scheme changes", () => {
    vi.restoreAllMocks();
    const scheme = mockColorScheme(false);
    render(
      <ConfigProvider theme="auto" palette="tech">
        <ConfigProvider locale={{ language: "fr" }}>
          <ShowConfig id="inner" />
        </ConfigProvider>
      </ConfigProvider>,
    );
    act(() => scheme.setDark(true));
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(html).toHaveAttribute("data-palette", "tech");
    expect(screen.getByTestId("inner")).toHaveTextContent("auto|dark|tech|fr");
  });
});
