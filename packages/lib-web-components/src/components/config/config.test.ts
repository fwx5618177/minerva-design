import { describe, expect, it, vi } from "vitest";
import { MinervaConfig } from "./config";
import "../../elements/config";
import "../../elements/input";
import type { MinervaInput } from "../input/input";
import { $, mount, settle } from "../../../tests/utils";

describe("<minerva-config>", () => {
  it("writes the theme scope attributes of a nested ConfigProvider", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="dark" palette="tech" density="compact"><p>x</p></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-theme", "dark");
    expect(el).toHaveAttribute("data-palette", "tech");
    expect(el).toHaveAttribute("data-density", "compact");
    expect(el).toHaveAttribute("data-minerva-theme-scope");
    expect(el.style.colorScheme).toBe("dark");
    expect(el.resolvedMode).toBe("dark");
  });

  it("a design preset sets every axis and its default palette", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="light" design="editorial"></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-palette", "editorial");
    expect(el).toHaveAttribute("data-density");
    expect(el).toHaveAttribute("data-radius");
    el.palette = "cool";
    await el.updateComplete;
    expect(el).toHaveAttribute("data-palette", "cool");
  });

  it("follows the system preference with theme=system", async () => {
    const listeners: Array<() => void> = [];
    let dark = false;
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          get matches() {
            return dark;
          },
          media: query,
          addEventListener: (_: string, cb: () => void) => listeners.push(cb),
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="system"></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-theme", "light");
    const onChange = vi.fn();
    el.addEventListener("minerva-theme-change", onChange);
    dark = true;
    listeners.forEach((cb) => cb());
    expect(el).toHaveAttribute("data-theme", "dark");
    expect(onChange.mock.calls[0][0].detail).toEqual({ mode: "dark" });
    vi.restoreAllMocks();
  });

  it("github-dark applies inline tokens", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="github-dark"></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-theme", "dark");
    expect(el.style.getPropertyValue("--background-color")).not.toBe("");
    el.theme = "light";
    await el.updateComplete;
    expect(el.style.getPropertyValue("--background-color")).toBe("");
  });

  it("root applies to <html> and cleans up", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config root theme="dark" locale="ja"></minerva-config>`,
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.lang).toBe("ja");
    expect(el).not.toHaveAttribute("data-theme");
    el.remove();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("scopes the language of the elements inside (closest scope wins)", async () => {
    await mount(
      `<minerva-config locale="fr"><minerva-input id="a" clearable value="x"></minerva-input>
         <minerva-config locale="zh"><minerva-input id="b" clearable value="x"></minerva-input></minerva-config>
       </minerva-config>`,
    );
    const a = document.getElementById("a") as MinervaInput;
    const b = document.getElementById("b") as MinervaInput;
    expect($(a, "[part=clear-button]").getAttribute("aria-label")).toBe(
      "Effacer",
    );
    expect($(b, "[part=clear-button]").getAttribute("aria-label")).toBe("清除");
    a.parentElement!.setAttribute("locale", "ja");
    await settle();
    expect($(a, "[part=clear-button]").getAttribute("aria-label")).not.toBe(
      "Effacer",
    );
  });
});
