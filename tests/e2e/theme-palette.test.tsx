// Theme mode + palette switching persisted as cookies and <html> attributes,
// and THEME_INIT_SCRIPT applying the stored preference before React renders
// (English labels, no default palette).
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Empty,
  Modal,
  PaletteToggle,
  ThemeProvider,
  ThemeToggle,
  useConfig,
  useTheme,
  type SupportedLanguage,
} from "minerva-design";
import { THEME_INIT_SCRIPT } from "minerva-design/theme-utils";

const html = document.documentElement;

function readCookies(): Record<string, string> {
  return Object.fromEntries(
    document.cookie
      .split("; ")
      .filter(Boolean)
      .map((pair) => pair.split("=") as [string, string]),
  );
}

function clearThemeState() {
  for (const name of ["theme", "palette"]) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
  html.removeAttribute("style");
}

/** Controllable prefers-color-scheme media query */
function mockSystemScheme(initial: "light" | "dark") {
  let dark = initial === "dark";
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        media: query,
        get matches() {
          return query.includes("dark") ? dark : !dark;
        },
        onchange: null,
        addEventListener: (_type: string, fn: () => void) => {
          listeners.add(fn);
        },
        removeEventListener: (_type: string, fn: () => void) => {
          listeners.delete(fn);
        },
        addListener: (fn: () => void) => listeners.add(fn),
        removeListener: (fn: () => void) => listeners.delete(fn),
        dispatchEvent: () => true,
      }) as unknown as MediaQueryList,
  );
  return {
    set(next: "light" | "dark") {
      dark = next === "dark";
      for (const fn of listeners) fn();
    },
  };
}

const labels = {
  light: "Light",
  dark: "Dark",
  system: "System",
  tech: "Tech",
  graphite: "Graphite",
  status: "Appearance",
};

beforeEach(clearThemeState);
afterEach(() => {
  clearThemeState();
  vi.restoreAllMocks();
});

describe("theme mode + palette", () => {
  // No palette is applied until one is chosen (useTheme reports null)

  function CurrentTheme() {
    const { theme, resolvedTheme, palette } = useTheme();
    return (
      <output aria-label={labels.status}>
        {`${theme}/${resolvedTheme}/${String(palette)}`}
      </output>
    );
  }

  function SettingsPage() {
    return (
      <ThemeProvider>
        <header>
          <ThemeToggle />
          <PaletteToggle palettes={["editorial", "tech", "graphite"]} />
        </header>
        <CurrentTheme />
      </ThemeProvider>
    );
  }

  const status = () => screen.getByRole("status", { name: labels.status });
  const pressed = (name: string) =>
    screen.getByRole("button", { name }).getAttribute("data-state") ===
    "active";
  const expectNoPalette = () =>
    expect(html).not.toHaveAttribute("data-palette");

  describe("theme & palette switching", () => {
    it("first visit follows the system, then explicit choices update <html> and persist as cookies", async () => {
      mockSystemScheme("dark");
      const user = userEvent.setup();
      render(<SettingsPage />);

      expect(html).toHaveAttribute("data-theme", "dark");
      expectNoPalette();
      expect(await screen.findByText("system/dark/null")).toBe(status());
      expect(pressed(labels.system)).toBe(true);
      expect(readCookies()).toEqual({});

      await user.click(screen.getByRole("button", { name: labels.light }));
      expect(html).toHaveAttribute("data-theme", "light");
      expect(html.style.colorScheme).toBe("light");
      expect(pressed(labels.light)).toBe(true);
      expect(pressed(labels.system)).toBe(false);

      await user.click(screen.getByRole("button", { name: labels.graphite }));
      expect(html).toHaveAttribute("data-palette", "graphite");
      expect(readCookies()).toEqual({ theme: "light", palette: "graphite" });

      await user.click(screen.getByRole("button", { name: labels.system }));
      expect(html).toHaveAttribute("data-theme", "dark");
      expect(readCookies().theme).toBe("system");
    });

    it("in system mode, follows OS scheme changes live; an explicit choice stops following", async () => {
      const system = mockSystemScheme("light");
      const user = userEvent.setup();
      render(<SettingsPage />);
      expect(html).toHaveAttribute("data-theme", "light");

      act(() => system.set("dark"));
      expect(html).toHaveAttribute("data-theme", "dark");

      await user.click(
        await screen.findByRole("button", { name: labels.light }),
      );
      act(() => system.set("dark"));
      expect(html).toHaveAttribute("data-theme", "light");
      expect(status()).toHaveTextContent("light/light/null");
    });

    it("a returning visitor gets their stored preference back after remount", async () => {
      mockSystemScheme("light");
      const user = userEvent.setup();
      const first = render(<SettingsPage />);
      await user.click(
        await screen.findByRole("button", { name: labels.dark }),
      );
      await user.click(screen.getByRole("button", { name: labels.tech }));
      first.unmount();

      html.removeAttribute("data-theme");
      html.removeAttribute("data-palette");
      render(<SettingsPage />);

      expect(html).toHaveAttribute("data-theme", "dark");
      expect(html).toHaveAttribute("data-palette", "tech");
      expect(pressed(labels.dark)).toBe(true);
      expect(pressed(labels.tech)).toBe(true);
      expect(status()).toHaveTextContent("dark/dark/tech");
    });

    it("ignores tampered cookies and falls back to defaults", async () => {
      mockSystemScheme("light");
      document.cookie = "theme=purple; path=/";
      document.cookie = "palette=neon; path=/";
      render(<SettingsPage />);

      expect(html).toHaveAttribute("data-theme", "light");
      expectNoPalette();
      expect(await screen.findByText("system/light/null")).toBe(status());
    });
  });

  describe("THEME_INIT_SCRIPT (no-flash boot before React renders)", () => {
    const runInitScript = () => {
      // Same as the inline <script> an SSR layout injects into <head>
      new Function(THEME_INIT_SCRIPT)();
    };

    it("applies stored cookies to <html> synchronously, and React then agrees with it", () => {
      mockSystemScheme("light");
      document.cookie = "theme=dark; path=/";
      document.cookie = "palette=cool; path=/";

      runInitScript();
      expect(html).toHaveAttribute("data-theme", "dark");
      expect(html).toHaveAttribute("data-palette", "cool");
      expect(html.style.colorScheme).toBe("dark");

      render(
        <ThemeProvider defaultTheme="dark" defaultPalette="cool">
          <CurrentTheme />
        </ThemeProvider>,
      );
      expect(html).toHaveAttribute("data-theme", "dark");
      expect(html).toHaveAttribute("data-palette", "cool");
      expect(status()).toHaveTextContent("dark/dark/cool");
    });

    it('resolves "system" (or a missing cookie) through prefers-color-scheme', () => {
      mockSystemScheme("dark");
      runInitScript();
      expect(html).toHaveAttribute("data-theme", "dark");
      expectNoPalette();

      document.cookie = "theme=system; path=/";
      mockSystemScheme("light");
      runInitScript();
      expect(html).toHaveAttribute("data-theme", "light");
    });

    it("falls back on invalid cookies, keeping a valid server-rendered palette", () => {
      mockSystemScheme("dark");
      document.cookie = "theme=<script>; path=/";
      document.cookie = "palette=neon; path=/";
      html.setAttribute("data-palette", "tech");

      runInitScript();
      expect(html).toHaveAttribute("data-theme", "dark");
      expect(html).toHaveAttribute("data-palette", "tech");

      html.setAttribute("data-palette", "bogus");
      runInitScript();
      expectNoPalette();
    });

    it('only matches exact cookie names (e.g. "mytheme" is not "theme")', () => {
      mockSystemScheme("light");
      document.cookie = "mytheme=dark; path=/";
      document.cookie = "xpalette=tech; path=/";
      runInitScript();
      expect(html).toHaveAttribute("data-theme", "light");
      expectNoPalette();
      document.cookie = "mytheme=; path=/; max-age=0";
      document.cookie = "xpalette=; path=/; max-age=0";
    });
  });

  describe("nested providers (a docs page with live demos)", () => {
    // Like the locale demo of the docs site: a nested provider that only
    // changes the React library's language for its subtree.
    function LocaleDemo() {
      const [language, setLanguage] = useState<SupportedLanguage>("en");
      return (
        <section aria-label="Locale demo">
          {(["en", "ja", "fr"] as const).map((lng) => (
            <Button key={lng} size="small" onClick={() => setLanguage(lng)}>
              {`lang-${lng}`}
            </Button>
          ))}
          <ConfigProvider locale={{ language }}>
            <LocaleStatus />
            <Empty />
          </ConfigProvider>
        </section>
      );
    }

    function LocaleStatus() {
      const { locale, palette, resolvedMode } = useConfig();
      return (
        <output aria-label="Demo config">
          {`${locale?.language}/${resolvedMode}/${String(palette)}`}
        </output>
      );
    }

    // A scoped preview: dark theme for this subtree only, Modal included
    function DarkPreview() {
      const [open, setOpen] = useState(false);
      return (
        <ConfigProvider theme="dark">
          <Button onClick={() => setOpen(true)}>Open preview dialog</Button>
          <Modal open={open} onOpenChange={setOpen} title="Preview dialog">
            body
          </Modal>
        </ConfigProvider>
      );
    }

    function DocsPage() {
      const [demo, setDemo] = useState<"none" | "locale" | "preview">("none");
      return (
        <ThemeProvider>
          <header>
            <ThemeToggle />
            <PaletteToggle palettes={["editorial", "tech", "graphite"]} />
          </header>
          <CurrentTheme />
          <Empty />
          <nav>
            <Button onClick={() => setDemo("locale")}>Locale demo</Button>
            <Button onClick={() => setDemo("preview")}>Preview demo</Button>
            <Button onClick={() => setDemo("none")}>Close demos</Button>
          </nav>
          {demo === "locale" && <LocaleDemo />}
          {demo === "preview" && <DarkPreview />}
        </ThemeProvider>
      );
    }

    it("switching the palette at the root survives opening / using / closing the locale demo", async () => {
      mockSystemScheme("light");
      const user = userEvent.setup();
      render(<DocsPage />);

      await user.click(
        await screen.findByRole("button", { name: labels.light }),
      );
      await user.click(screen.getByRole("button", { name: labels.tech }));
      expect(html).toHaveAttribute("data-palette", "tech");
      const cookies = readCookies();
      const rootHtml = html.outerHTML.slice(0, html.outerHTML.indexOf(">"));

      await user.click(screen.getByRole("button", { name: "Locale demo" }));
      const demo = screen.getByRole("region", { name: "Locale demo" });
      // the nested provider inherits the root's theme and palette
      expect(
        within(demo).getByRole("status", { name: "Demo config" }),
      ).toHaveTextContent("en/light/tech");

      await user.click(within(demo).getByRole("button", { name: "lang-ja" }));
      expect(
        within(demo).getByRole("status", { name: "Demo config" }),
      ).toHaveTextContent("ja/light/tech");
      expect(within(demo).getByText("データがありません")).toBeInTheDocument();
      // only the demo is translated: the page keeps English built-in texts
      expect(screen.getAllByText("No Data")).toHaveLength(1);

      // <html> (palette, theme, tokens) and the cookies are untouched
      expect(html).toHaveAttribute("data-palette", "tech");
      expect(html).toHaveAttribute("data-theme", "light");
      expect(html.outerHTML.slice(0, html.outerHTML.indexOf(">"))).toBe(
        rootHtml,
      );
      expect(readCookies()).toEqual(cookies);

      await user.click(screen.getByRole("button", { name: "Close demos" }));
      expect(html).toHaveAttribute("data-palette", "tech");
      expect(html.outerHTML.slice(0, html.outerHTML.indexOf(">"))).toBe(
        rootHtml,
      );
      expect(status()).toHaveTextContent("light/light/tech");

      // the root palette can still be switched afterwards
      await user.click(screen.getByRole("button", { name: labels.graphite }));
      expect(html).toHaveAttribute("data-palette", "graphite");
      expect(readCookies().palette).toBe("graphite");
    });

    it("a scoped dark preview themes its dialog, not the page", async () => {
      mockSystemScheme("light");
      const user = userEvent.setup();
      render(<DocsPage />);
      await user.click(
        await screen.findByRole("button", { name: labels.light }),
      );
      await user.click(screen.getByRole("button", { name: labels.tech }));

      await user.click(screen.getByRole("button", { name: "Preview demo" }));
      await user.click(
        screen.getByRole("button", { name: "Open preview dialog" }),
      );
      const dialog = await screen.findByRole("dialog", {
        name: "Preview dialog",
      });
      const scope = dialog.closest("[data-minerva-theme-scope]");
      expect(scope).toHaveAttribute("data-theme", "dark");
      // the preview inherits the root palette, in its own mode
      expect(scope).toHaveAttribute("data-palette", "tech");
      expect(html).toHaveAttribute("data-theme", "light");
      expect(html).toHaveAttribute("data-palette", "tech");

      await user.keyboard("{Escape}");
      await user.click(screen.getByRole("button", { name: "Close demos" }));
      expect(document.querySelector("[data-minerva-theme-scope]")).toBeNull();
      expect(html).toHaveAttribute("data-theme", "light");
      expect(html).toHaveAttribute("data-palette", "tech");
    });
  });
});
