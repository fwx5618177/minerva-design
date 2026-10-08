import { createElement, type ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useAutoTheme from "./useAutoTheme";
import { dark, githubDark, light } from "@minerva/core";
import { mockColorScheme } from "../test-utils/matchMedia";
import type { Theme } from "../contexts/types";
import { ConfigProvider } from "../contexts/ConfigProvider";

const cssVar = (name: string) =>
  document.documentElement.style.getPropertyValue(`--${name}`);

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("style");
});

describe("useAutoTheme", () => {
  it("applies a named theme as CSS variables", () => {
    mockColorScheme(false);
    renderHook(() => useAutoTheme("github-dark"));
    expect(cssVar("background-color")).toBe(githubDark["background-color"]);
  });

  it('follows the system scheme in "auto" mode and reacts to changes', () => {
    const scheme = mockColorScheme(false);
    const { result } = renderHook(() => useAutoTheme("auto"));

    expect(result.current[0]).toBe("auto");
    expect(result.current[2]).toBe("light");
    expect(cssVar("background-color")).toBe(light["background-color"]);

    act(() => scheme.setDark(true));

    // the configured theme stays "auto"; only the resolved scheme changes
    expect(result.current[0]).toBe("auto");
    expect(result.current[2]).toBe("dark");
    expect(cssVar("background-color")).toBe(dark["background-color"]);
  });

  it("removes the matchMedia listener on unmount (no leak)", () => {
    const scheme = mockColorScheme(false);
    const { unmount } = renderHook(() => useAutoTheme("auto"));

    expect(scheme.listeners.size).toBe(1);
    unmount();
    expect(scheme.removeEventListener).toHaveBeenCalledTimes(1);
    expect(scheme.listeners.size).toBe(0);
  });

  it("stops listening when switching from auto to a fixed theme", () => {
    const scheme = mockColorScheme(false);
    const { result } = renderHook(() => useAutoTheme("auto"));
    expect(scheme.listeners.size).toBe(1);

    act(() => result.current[1]("dark"));

    expect(scheme.listeners.size).toBe(0);
    expect(cssVar("background-color")).toBe(dark["background-color"]);

    // system changes no longer affect a fixed theme
    act(() => scheme.setDark(false));
    expect(cssVar("background-color")).toBe(dark["background-color"]);
  });

  it("follows the system scheme for { light, dark } pairs", () => {
    const scheme = mockColorScheme(true);
    const pair = {
      light: { ...light, "primary-color": "#111111" },
      dark: { ...dark, "primary-color": "#eeeeee" },
    };
    renderHook(() => useAutoTheme(pair));
    expect(cssVar("primary-color")).toBe("#eeeeee");

    act(() => scheme.setDark(false));
    expect(cssVar("primary-color")).toBe("#111111");
  });

  it("re-applies when the theme argument changes", () => {
    mockColorScheme(false);
    const { rerender } = renderHook(
      ({ theme }: { theme: Theme }) => useAutoTheme(theme),
      { initialProps: { theme: "light" as Theme } },
    );
    expect(cssVar("background-color")).toBe(light["background-color"]);

    rerender({ theme: "github-dark" });
    expect(cssVar("background-color")).toBe(githubDark["background-color"]);
  });

  it("only manages state inside a ConfigProvider (the root provider owns <html>)", () => {
    mockColorScheme(false);
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ConfigProvider, {
        theme: "light",
        palette: "tech",
        children,
      });
    const { result } = renderHook(() => useAutoTheme("github-dark"), {
      wrapper,
    });
    expect(result.current[0]).toBe("github-dark");
    expect(cssVar("background-color")).toBe("");
    expect(document.documentElement).toHaveAttribute("data-palette", "tech");
    act(() => result.current[1]("dark"));
    expect(cssVar("background-color")).toBe("");
  });
});
