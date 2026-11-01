import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaConfig } from "./config";
import "../../elements/config";
import { mount } from "../../../tests/utils";

const cssVar = (el: HTMLElement, name: string) =>
  el.style.getPropertyValue(`--${name}`);

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("style");
  document.documentElement.removeAttribute("data-theme");
});

describe("<minerva-config primary-color>", () => {
  it("writes the brand tokens of the applied mode", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="light" primary-color="#4f46e5"></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-theme", "light");
    expect(el).toHaveAttribute("data-minerva-theme-scope");
    expect(cssVar(el, "primary-color")).toBe("#4f46e5");
    expect(cssVar(el, "primary-color-hover")).toContain("var(--primary-color)");
    el.theme = "dark";
    await el.updateComplete;
    expect(el).toHaveAttribute("data-theme", "dark");
    expect(cssVar(el, "primary-color")).toBe("#7b85f2");
  });

  it("accepts a { light, dark } pair and wins over the palette", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="dark" palette="tech"></minerva-config>`,
    );
    el.primaryColor = { light: "#4f46e5", dark: "#818cf8" };
    await el.updateComplete;
    expect(el).toHaveAttribute("data-palette", "tech");
    expect(cssVar(el, "primary-color")).toBe("#818cf8");
    el.primaryColor = undefined;
    await el.updateComplete;
    expect(cssVar(el, "primary-color")).toBe("");
  });

  it("keeps the mode of the closest themed ancestor without a theme", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    const el = await mount<MinervaConfig>(
      `<minerva-config primary-color="#4f46e5"></minerva-config>`,
    );
    expect(el).not.toHaveAttribute("data-theme");
    // no scope: a scope would reset the subtree to the light tokens
    expect(el).not.toHaveAttribute("data-minerva-theme-scope");
    expect(cssVar(el, "primary-color")).toBe("#7b85f2");
  });

  it("uses the light value in a scope without a theme (it renders light)", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    const el = await mount<MinervaConfig>(
      `<minerva-config palette="editorial" primary-color="#0d9488"></minerva-config>`,
    );
    expect(el).toHaveAttribute("data-minerva-theme-scope");
    expect(cssVar(el, "primary-color")).toBe("#0d9488");
  });

  it("applies to <html> with root", async () => {
    const el = await mount<MinervaConfig>(
      `<minerva-config root theme="light" primary-color="#4f46e5"></minerva-config>`,
    );
    expect(cssVar(document.documentElement, "primary-color")).toBe("#4f46e5");
    el.remove();
    expect(cssVar(document.documentElement, "primary-color")).toBe("");
  });

  it("ignores an invalid color with a development warning", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount<MinervaConfig>(
      `<minerva-config theme="light" primary-color="no-such-color"></minerva-config>`,
    );
    expect(cssVar(el, "primary-color")).toBe("");
    expect(
      error.mock.calls.some(([message]) =>
        String(message).includes("<minerva-config>"),
      ),
    ).toBe(true);
  });
});
