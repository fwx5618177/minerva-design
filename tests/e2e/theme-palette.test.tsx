// Theme mode + palette switching persisted as cookies and <html> attributes,
// and THEME_INIT_SCRIPT applying the stored preference before React renders
// (English labels, no default palette).
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  PaletteToggle,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "@minerva/lib-core";
import { THEME_INIT_SCRIPT } from "@minerva/lib-core/theme-utils";

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
    screen.getByRole("button", { name }).hasAttribute("data-active");
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
});
