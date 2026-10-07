import React from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConfigProvider, useConfig } from "./ConfigProvider";
import i18n from "../config/i18n";
import { dark, githubDark } from "../styles/themes";
import { mockColorScheme } from "../test-utils/matchMedia";

const ShowConfig = () => {
  const { theme, resolvedTheme, locale } = useConfig();
  return (
    <dl>
      <dt>theme</dt>
      <dd data-testid="theme">{String(theme)}</dd>
      <dt>resolved</dt>
      <dd data-testid="resolved">{String(resolvedTheme)}</dd>
      <dt>language</dt>
      <dd data-testid="language">{locale?.language}</dd>
    </dl>
  );
};

const cssVar = (name: string) =>
  document.documentElement.style.getPropertyValue(`--${name}`);

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("style");
});

describe("ConfigProvider", () => {
  it('defaults to theme "auto" and language "en"', () => {
    mockColorScheme(true);
    render(
      <ConfigProvider>
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("auto");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("language")).toHaveTextContent("en");
    expect(i18n.language).toBe("en");
    expect(cssVar("background-color")).toBe(dark["background-color"]);
  });

  it('accepts the built-in "github-dark" theme', () => {
    mockColorScheme(false);
    render(
      <ConfigProvider theme="github-dark">
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("github-dark");
    expect(cssVar("background-color")).toBe(githubDark["background-color"]);
  });

  it("updates theme and locale when props change", () => {
    const scheme = mockColorScheme(false);
    const { rerender } = render(
      <ConfigProvider theme="auto" locale={{ language: "en" }}>
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(scheme.listeners.size).toBe(1);

    rerender(
      <ConfigProvider theme="dark" locale={{ language: "fr" }}>
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("language")).toHaveTextContent("fr");
    expect(i18n.language).toBe("fr");
    // switching away from auto drops the media query listener
    expect(scheme.listeners.size).toBe(0);
  });

  it("re-resolves auto mode when the system scheme changes", () => {
    const scheme = mockColorScheme(false);
    render(
      <ConfigProvider>
        <ShowConfig />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    act(() => scheme.setDark(true));
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
  });

  it("throws a clear error when useConfig is used outside the provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => renderHook(() => useConfig())).toThrow(
      "useConfig must be used within a ConfigProvider",
    );
  });
});
