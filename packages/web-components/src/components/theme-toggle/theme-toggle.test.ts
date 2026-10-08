import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  MinervaPaletteToggle,
  MinervaThemeToggle,
  resetDocumentTheme,
} from "./theme-toggle";
import "../../elements/theme-toggle";
import "../../elements/config";
import type { MinervaConfig } from "../config/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

const root = document.documentElement;

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
  resetDocumentTheme();
  root.removeAttribute("style");
  root.removeAttribute("data-theme");
  root.removeAttribute("data-palette");
  document.cookie = "theme=; path=/; max-age=0";
  document.cookie = "palette=; path=/; max-age=0";
});

const buttons = (el: Element) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button"));
const button = (el: Element, name: string) =>
  buttons(el).find((b) => b.textContent?.trim() === name)!;
const active = (el: Element) =>
  buttons(el)
    .filter((b) => b.getAttribute("aria-pressed") === "true")
    .map((b) => b.textContent?.trim());

const matchDark = (dark: boolean) =>
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        matches: dark && query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => true,
      }) as unknown as MediaQueryList,
  );

describe("<minerva-theme-toggle>", () => {
  it("registers both toggles", () => {
    expect(customElements.get("minerva-theme-toggle")).toBe(MinervaThemeToggle);
    expect(customElements.get("minerva-palette-toggle")).toBe(
      MinervaPaletteToggle,
    );
  });

  it("renders a group of light / dark / system toggle buttons", async () => {
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle></minerva-theme-toggle>`,
    );
    const group = $(el, ".group");
    expect(group).toHaveAttribute("role", "group");
    expect(buttons(el).map((b) => b.textContent?.trim())).toEqual([
      "Light",
      "Dark",
      "System",
    ]);
    expect(buttons(el).every((b) => b.classList.contains("item"))).toBe(true);
    expect(buttons(el).every((b) => b.type === "button")).toBe(true);
    el.hideSystem = true;
    el.labels = { dark: "Night" };
    await settle();
    expect(buttons(el).map((b) => b.textContent?.trim())).toEqual([
      "Light",
      "Night",
    ]);
    expect(el).toHaveAttribute("hide-system");
  });

  it("switches <html> data-theme without a <minerva-config>", async () => {
    const user = userEvent.setup();
    root.setAttribute("data-theme", "light");
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle></minerva-theme-toggle>`,
    );
    expect(active(el)).toEqual(["Light"]);
    expect($(el, ".group")).toHaveAttribute(
      "aria-label",
      "Current theme light",
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail),
    );
    await user.click(button(el, "Dark"));
    await settle();
    expect(onChange).toHaveBeenCalledWith({ value: "dark" });
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
    expect(active(el)).toEqual(["Dark"]);
    // public item parts: item--active moves to the clicked option
    expect(button(el, "Dark")).toHaveAttribute("part", "item item--active");
    expect(button(el, "Light")).toHaveAttribute("part", "item item--inactive");
    expect($(el, ".group")).toHaveAttribute("aria-label", "Current theme dark");
    expect(document.cookie).not.toContain("theme=dark");
  });

  it("marks system active while reporting the resolved system theme", async () => {
    const user = userEvent.setup();
    matchDark(true);
    root.setAttribute("data-theme", "light");
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle></minerva-theme-toggle>`,
    );
    await user.click(button(el, "System"));
    await settle();
    expect(active(el)).toEqual(["System"]);
    expect($(el, ".group")).toHaveAttribute("aria-label", "Current theme dark");
    expect(root.dataset.theme).toBe("dark");
  });

  it("persists the theme to the cookie with persist and restores it", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle persist></minerva-theme-toggle>`,
    );
    await user.click(button(el, "Dark"));
    expect(document.cookie).toContain("theme=dark");
    resetDocumentTheme();
    root.removeAttribute("data-theme");
    const again = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle persist></minerva-theme-toggle>`,
    );
    expect(root.dataset.theme).toBe("dark");
    expect(active(again)).toEqual(["Dark"]);
  });

  it("keeps the theme when minerva-change is canceled", async () => {
    const user = userEvent.setup();
    root.setAttribute("data-theme", "light");
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle></minerva-theme-toggle>`,
    );
    el.addEventListener("minerva-change", (e) => e.preventDefault());
    await user.click(button(el, "Dark"));
    await settle();
    expect(root.dataset.theme).toBe("light");
    expect(active(el)).toEqual(["Light"]);
  });

  it("drives the closest <minerva-config> instead of <html>", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-config theme="light"><minerva-theme-toggle></minerva-theme-toggle></minerva-config>`,
    );
    const config = document.querySelector<MinervaConfig>("minerva-config")!;
    const el = document.querySelector<MinervaThemeToggle>(
      "minerva-theme-toggle",
    )!;
    expect(active(el)).toEqual(["Light"]);
    await user.click(button(el, "Dark"));
    await settle();
    expect(config.theme).toBe("dark");
    expect(config).toHaveAttribute("data-theme", "dark");
    expect(root).not.toHaveAttribute("data-theme");
    expect(active(el)).toEqual(["Dark"]);
    // external changes of the scope are reflected
    config.theme = "system";
    await settle();
    expect(active(el)).toEqual(["System"]);
  });

  it("uses the localized labels", async () => {
    const el = await mount<MinervaThemeToggle>(
      `<div lang="zh"><minerva-theme-toggle></minerva-theme-toggle></div>`,
      "minerva-theme-toggle",
    );
    expect(buttons(el).map((b) => b.textContent?.trim())).not.toContain(
      "Light",
    );
    expect($(el, ".group").getAttribute("aria-label")).not.toContain(
      "Current theme",
    );
  });

  it("visits each option and activates with Space and Enter", async () => {
    const user = userEvent.setup();
    root.setAttribute("data-theme", "light");
    const el = await mount<MinervaThemeToggle>(
      `<minerva-theme-toggle></minerva-theme-toggle>`,
    );
    button(el, "Dark").focus();
    await user.keyboard(" ");
    await settle();
    expect(root.dataset.theme).toBe("dark");
    expect(button(el, "Dark")).toHaveAttribute("aria-pressed", "true");
    expect(el.shadowRoot!.activeElement).toBe(button(el, "Dark"));
    button(el, "Light").focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(root.dataset.theme).toBe("light");
    expect(button(el, "Light")).toHaveAttribute("aria-pressed", "true");
  });
});

describe("<minerva-palette-toggle>", () => {
  it("offers every palette by default and updates <html> data-palette", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaPaletteToggle>(
      `<minerva-palette-toggle></minerva-palette-toggle>`,
    );
    expect(buttons(el).map((b) => b.textContent?.trim())).toEqual([
      "Editorial",
      "Tech",
      "Graphite",
      "Cool",
    ]);
    expect(active(el)).toEqual([]);
    expect($(el, ".group")).toHaveAttribute(
      "aria-label",
      "Current palette Default",
    );
    const onChange = vi.fn();
    el.addEventListener("minerva-change", (e) =>
      onChange((e as CustomEvent).detail),
    );
    await user.click(button(el, "Tech"));
    await settle();
    expect(onChange).toHaveBeenCalledWith({ value: "tech" });
    expect(root.dataset.palette).toBe("tech");
    expect(active(el)).toEqual(["Tech"]);
    expect($(el, ".group")).toHaveAttribute(
      "aria-label",
      "Current palette tech",
    );
  });

  it("renders only the requested palettes with partial labels", async () => {
    const el = await mount<MinervaPaletteToggle>(
      `<minerva-palette-toggle palettes="graphite cool"></minerva-palette-toggle>`,
    );
    el.labels = { cool: "Ice" };
    await settle();
    expect(buttons(el).map((b) => b.textContent?.trim())).toEqual([
      "Graphite",
      "Ice",
    ]);
  });

  it("can offer the default look (no palette)", async () => {
    const user = userEvent.setup();
    root.setAttribute("data-palette", "cool");
    const el = await mount<MinervaPaletteToggle>(
      `<minerva-palette-toggle show-default persist></minerva-palette-toggle>`,
    );
    expect(buttons(el)[0].textContent?.trim()).toBe("Default");
    expect(active(el)).toEqual(["Cool"]);
    await user.click(button(el, "Default"));
    await settle();
    expect(root).not.toHaveAttribute("data-palette");
    expect(active(el)).toEqual(["Default"]);
    expect(document.cookie).not.toContain("palette=");
  });

  it("persists the palette cookie with persist", async () => {
    const user = userEvent.setup();
    const el = await mount<MinervaPaletteToggle>(
      `<minerva-palette-toggle persist></minerva-palette-toggle>`,
    );
    await user.click(button(el, "Graphite"));
    expect(document.cookie).toContain("palette=graphite");
  });

  it("drives the palette of the closest <minerva-config>", async () => {
    const user = userEvent.setup();
    await mount(
      `<minerva-config theme="light" palette="graphite"><minerva-palette-toggle></minerva-palette-toggle></minerva-config>`,
    );
    const config = document.querySelector<MinervaConfig>("minerva-config")!;
    const el = document.querySelector<MinervaPaletteToggle>(
      "minerva-palette-toggle",
    )!;
    expect(active(el)).toEqual(["Graphite"]);
    button(el, "Cool").focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(config.palette).toBe("cool");
    expect(config).toHaveAttribute("data-palette", "cool");
    expect(root).not.toHaveAttribute("data-palette");
    expect(button(el, "Cool")).toHaveAttribute("aria-pressed", "true");
  });

  it("warns in development about unknown palettes", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(
      `<minerva-palette-toggle palettes="tech neon"></minerva-palette-toggle>`,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("neon"));
  });

  it("uses the localized labels", async () => {
    const el = await mount<MinervaPaletteToggle>(
      `<minerva-config locale="fr"><minerva-palette-toggle show-default></minerva-palette-toggle></minerva-config>`,
      "minerva-palette-toggle",
    );
    expect($(el, ".group").getAttribute("aria-label")).not.toBe(
      "Current palette Default",
    );
  });
});
