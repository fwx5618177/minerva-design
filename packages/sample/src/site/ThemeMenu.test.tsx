// @vitest-environment happy-dom
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import ThemeMenu from "./ThemeMenu";
import {
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "../theme/ThemeModeContext";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);
beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

const renderMenu = () =>
  render(
    <SiteProviders>
      <ThemeMenu />
    </SiteProviders>,
  );

describe("ThemeMenu", () => {
  it("switches to dark mode and persists the choice", async () => {
    const user = userEvent.setup();
    const { unmount } = renderMenu();

    await user.click(screen.getByRole("button", { name: "Theme: System" }));
    await user.click(
      await screen.findByRole("menuitemradio", { name: "Dark" }),
    );

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("button", { name: "Theme: Dark" })).toHaveFocus();

    // a new visit starts from the stored choice
    unmount();
    document.documentElement.removeAttribute("data-theme");
    renderMenu();
    expect(
      screen.getByRole("button", { name: "Theme: Dark" }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("is keyboard operable and also picks the palette", async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByRole("button", { name: /Theme/ });
    trigger.focus();
    await user.keyboard("{Enter}");
    const light = await screen.findByRole("menuitemradio", { name: "Light" });
    expect(light).toBeInTheDocument();
    expect(
      screen.getByRole("menuitemradio", { name: "System" }),
    ).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("menuitemradio", { name: "Graphite" }));
    expect(localStorage.getItem(PALETTE_STORAGE_KEY)).toBe("graphite");
  });
});
