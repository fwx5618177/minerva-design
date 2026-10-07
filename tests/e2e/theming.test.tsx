// Theme and locale switching across lib-core and <minerva-button>:
// ConfigProvider (light / dark / github-dark / auto), the locale of built-in
// texts, and the web component picking up the same design tokens.
import { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Cascader,
  ConfigProvider,
  TimePicker,
  themes,
  useConfig,
  type ConfigProviderThemeProps,
  type SupportedLanguage,
} from "@minerva/lib-core";
import "@minerva/lib-web-components";
import type {} from "../../packages/lib-web-components/tests/e2e/jsx";

/** Controllable prefers-color-scheme */
const mockScheme = (initialDark: boolean) => {
  let dark = initialDark;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return dark;
        },
        media: query,
        addEventListener: (_: string, l: () => void) => listeners.add(l),
        removeEventListener: (_: string, l: () => void) => listeners.delete(l),
      }) as unknown as MediaQueryList,
  );
  return {
    setDark(next: boolean) {
      dark = next;
      act(() => listeners.forEach((l) => l()));
    },
  };
};

const rootVar = (name: string) =>
  document.documentElement.style.getPropertyValue(`--${name}`);

const ResolvedTheme = () => {
  const { resolvedTheme } = useConfig();
  return <output aria-label="Resolved theme">{String(resolvedTheme)}</output>;
};

const App = () => {
  const [theme, setTheme] = useState<ConfigProviderThemeProps>("light");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  return (
    <ConfigProvider theme={theme} locale={{ language }}>
      <fieldset>
        <legend>Theme</legend>
        {(["light", "dark", "github-dark", "auto"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTheme(t)}>
            {t}
          </button>
        ))}
      </fieldset>
      <label>
        Language
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="fr">Français</option>
        </select>
      </label>
      <ResolvedTheme />
      <Cascader
        name="area"
        label="Area"
        options={[{ value: "a", label: "A" }]}
      />
      <TimePicker defaultValue={new Date(2024, 0, 1, 9, 0, 0)} />
      <minerva-button color="primary">Web component</minerva-button>
    </ConfigProvider>
  );
};

/**
 * A token as resolved inside <minerva-button>'s shadow root: lib-core's
 * button stylesheet maps the theme tokens to `--btn-tone` (fill) and
 * `--btn-tone-on` (text) on the inner <button>.
 */
const minervaButtonToken = async (token: "--btn-tone" | "--btn-tone-on") => {
  const host = document.querySelector("minerva-button") as HTMLElement & {
    updateComplete: Promise<unknown>;
  };
  await host.updateComplete;
  const inner = host.shadowRoot!.querySelector("button")!;
  return getComputedStyle(inner).getPropertyValue(token).trim();
};

describe("e2e: theming and locale", () => {
  beforeEach(() => {
    mockScheme(false);
  });

  it("switches built-in themes and the web component follows the tokens", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(rootVar("background-color")).toBe(themes.light["background-color"]);
    expect(await minervaButtonToken("--btn-tone")).toBe(
      themes.light["primary-color"],
    );

    await user.click(screen.getByRole("button", { name: "dark" }));
    expect(
      screen.getByRole("status", { name: "Resolved theme" }),
    ).toHaveTextContent("dark");
    expect(rootVar("background-color")).toBe(themes.dark["background-color"]);
    expect(await minervaButtonToken("--btn-tone")).toBe(
      themes.dark["primary-color"],
    );
    expect(await minervaButtonToken("--btn-tone-on")).toBe(
      themes.dark["text-inverse-color"],
    );

    await user.click(screen.getByRole("button", { name: "github-dark" }));
    expect(rootVar("primary-color")).toBe(
      themes["github-dark"]["primary-color"],
    );
    expect(await minervaButtonToken("--btn-tone")).toBe(
      themes["github-dark"]["primary-color"],
    );
  });

  it("follows the operating system in auto mode", async () => {
    const scheme = mockScheme(false);
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "auto" }));
    const resolved = screen.getByRole("status", { name: "Resolved theme" });
    expect(resolved).toHaveTextContent("light");
    expect(rootVar("background-color")).toBe(themes.light["background-color"]);

    scheme.setDark(true);
    expect(resolved).toHaveTextContent("dark");
    expect(rootVar("background-color")).toBe(themes.dark["background-color"]);
    expect(await minervaButtonToken("--btn-tone")).toBe(
      themes.dark["primary-color"],
    );

    // a fixed theme stops following the system
    await user.click(screen.getByRole("button", { name: "light" }));
    scheme.setDark(true);
    expect(resolved).toHaveTextContent("light");
  });

  it("switches the language of built-in texts", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole("combobox", { name: "Area" })).toHaveAttribute(
      "placeholder",
      "Please select",
    );
    expect(
      screen.getByRole("button", { name: "Clear time" }),
    ).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Language" }),
      "zh",
    );
    expect(screen.getByRole("combobox", { name: "Area" })).toHaveAttribute(
      "placeholder",
      "请选择",
    );
    expect(
      screen.getByRole("button", { name: "清除时间" }),
    ).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Language" }),
      "fr",
    );
    expect(screen.getByRole("combobox", { name: "Area" })).toHaveAttribute(
      "placeholder",
      "Veuillez choisir",
    );
    expect(
      screen.getByRole("button", { name: "Effacer l'heure" }),
    ).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Language" }),
      "en",
    );
  });
});
