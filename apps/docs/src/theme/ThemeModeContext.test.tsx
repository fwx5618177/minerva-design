// @vitest-environment happy-dom
// The site theme: the theme menu drives <html data-theme-name>, the theme and
// palette handed to the root provider, persistence across visits and the
// "System" mode following the operating system.
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import { beforeAll, beforeEach, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import ThemeMenu from "../site/ThemeMenu";
import { ThemeModeProvider } from "./ThemeModeContext";
import { setupI18n } from "../test/utils";

beforeAll(setupI18n);
beforeEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-name");
});

const renderSite = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <ThemeModeProvider>
        {(resolved, palette) => (
          <>
            <output data-testid="root-config">
              {`${resolved}:${palette ?? "none"}`}
            </output>
            <ThemeMenu />
          </>
        )}
      </ThemeModeProvider>
    </I18nextProvider>,
  );

const html = document.documentElement;
const rootConfig = () => screen.getByTestId("root-config");

const choose = async (
  user: ReturnType<typeof userEvent.setup>,
  name: string,
) => {
  await user.click(screen.getByRole("button", { name: /^Theme:/ }));
  await user.click(await screen.findByRole("menuitemradio", { name }));
};

it("applies dark, then a palette, and restores both on the next visit", async () => {
  const user = userEvent.setup();
  const { unmount } = renderSite();
  await choose(user, "Dark");
  expect(html).toHaveAttribute("data-theme-name", "dark");
  expect(html).toHaveAttribute("data-theme", "dark");
  await choose(user, "Tech");
  expect(rootConfig()).toHaveTextContent("dark:tech");

  unmount();
  html.removeAttribute("data-theme-name");
  renderSite();
  expect(rootConfig()).toHaveTextContent("dark:tech");
  expect(html).toHaveAttribute("data-theme-name", "dark");
  expect(screen.getByRole("button", { name: "Theme: Dark" })).toBeVisible();
});

it("GitHub Dark keeps its own tokens instead of the palette", async () => {
  const user = userEvent.setup();
  renderSite();
  await choose(user, "Tech");
  await choose(user, "GitHub Dark");
  expect(html).toHaveAttribute("data-theme-name", "github-dark");
  expect(html).toHaveAttribute("data-theme", "dark");
  expect(rootConfig()).toHaveTextContent("github-dark:none");
});

it("System follows the operating-system colour scheme", async () => {
  let dark = false;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        media: query,
        get matches() {
          return query === "(prefers-color-scheme: dark)" && dark;
        },
        addEventListener: (_: string, listener: () => void) =>
          listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) =>
          listeners.delete(listener),
      }) as unknown as MediaQueryList,
  );
  const user = userEvent.setup();
  renderSite();
  await choose(user, "Light");
  await choose(user, "System");
  expect(html).toHaveAttribute("data-theme-name", "light");
  act(() => {
    dark = true;
    listeners.forEach((listener) => listener());
  });
  expect(html).toHaveAttribute("data-theme-name", "dark");
  expect(rootConfig()).toHaveTextContent("dark:none");
});
