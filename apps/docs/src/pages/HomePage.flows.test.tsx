// @vitest-environment happy-dom
// Landing-page flows that used to run in a browser: copying the install
// command, editing the playground preview, the framework grid and the film
// format chosen from the viewport.
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import HomePage from "./HomePage";
import { SiteProviders, setupI18n } from "../test/utils";
import { frameworkBrands } from "@/site/frameworkBranding";

beforeAll(setupI18n);

const renderHome = () =>
  render(
    <SiteProviders>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </SiteProviders>,
  );

const preview = () => screen.getByTestId("playground-preview");

it("copies the highlighted install command", async () => {
  const user = userEvent.setup();
  renderHome();
  // userEvent.setup() installs its own clipboard: replace it afterwards
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  await screen.findByRole("region", { name: "Terminal code" });
  await user.click(screen.getByRole("button", { name: "Copy code" }));
  expect(writeText).toHaveBeenCalledWith("pnpm add minerva-design");
});

describe("component playground", () => {
  it("edits the preview card and resets every control", async () => {
    const user = userEvent.setup();
    renderHome();
    const view = within(preview());
    const name = view.getByRole("textbox", { name: "Workspace name" });
    await user.clear(name);
    await user.type(name, "My workspace");
    expect(preview()).toHaveTextContent("My workspace");
    await user.click(view.getByRole("switch", { name: "Notifications" }));
    expect(preview()).toHaveTextContent("Notifications disabled");
    await user.click(view.getByRole("button", { name: "Try button" }));
    expect(view.getByRole("status")).toHaveTextContent("Clicks: 1");

    await user.click(screen.getByRole("button", { name: "Reset playground" }));
    expect(view.getByRole("status")).toHaveTextContent("Clicks: 0");
    expect(view.getByRole("textbox")).toHaveValue("Minerva Studio");
    expect(preview()).toHaveTextContent("Notifications enabled");
  });

  it("scopes the density and writes the disabled flag into the source", async () => {
    const user = userEvent.setup();
    renderHome();
    const panel = within(
      screen.getByRole("region", { name: "Component playground" }),
    );
    const scope = preview().closest("[data-minerva-theme-scope]")!;
    await user.click(panel.getByRole("combobox", { name: "Density" }));
    await user.click(screen.getByRole("option", { name: "Compact" }));
    expect(scope).toHaveAttribute("data-density", "compact");
    await user.click(panel.getByRole("switch", { name: "Disable button" }));
    await user.click(
      panel.getByRole("button", { name: "View example source" }),
    );
    const code = panel.getByRole("region", { name: "TSX code" });
    expect(code).toHaveTextContent('density="compact"');
    expect(code).toHaveTextContent("disabled={true}");
  });
});

it("lists ten framework guides with distinct brand-coloured icons", () => {
  renderHome();
  const grid = document.querySelector<HTMLElement>(
    'section[aria-labelledby="home-frameworks"]',
  )!;
  const links = within(grid).getAllByRole("link");
  expect(links).toHaveLength(10);
  for (const container of [
    grid,
    screen.getByRole("group", { name: "Supported frameworks" }),
  ]) {
    const icons = [
      ...container.querySelectorAll<SVGElement>("[data-framework-icon]"),
    ];
    expect(icons).toHaveLength(10);
    const colors = icons.map((icon) => icon.style.color);
    expect(new Set(colors).size).toBeGreaterThanOrEqual(7);
    for (const color of colors) {
      const [r, g, b] = color.match(/\d+/g)!.map(Number);
      expect(r === g && g === b).toBe(false);
    }
  }
  for (const link of links) {
    const id = link
      .querySelector("[data-framework-icon]")!
      .getAttribute("data-framework-icon") as keyof typeof frameworkBrands;
    expect(link).toHaveAttribute("href", `/${frameworkBrands[id].guide}`);
    expect(link).toHaveTextContent(frameworkBrands[id].name);
  }
});

it("shows the canonical favicon as the logo", () => {
  renderHome();
  const logo = document.querySelector<HTMLImageElement>("[data-minerva-logo]");
  expect(logo?.getAttribute("src")).toBe(
    `${import.meta.env.BASE_URL}favicon.svg`,
  );
});

describe("promo film", () => {
  const video = () => document.querySelector("video")!;

  it("defaults to portrait on narrow viewports and links the same file", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query === "(max-width: 767px)",
          media: query,
          addEventListener() {},
          removeEventListener() {},
        }) as unknown as MediaQueryList,
    );
    renderHome();
    const src = video().getAttribute("src")!;
    expect(src).toMatch(/Film-en-portrait-1080p\.mp4$/);
    expect(
      screen.getByRole("button", { name: "Portrait · 30s" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Open video" })).toHaveAttribute(
      "href",
      src,
    );
  });

  it("replaces the video element when the language changes", async () => {
    const user = userEvent.setup();
    renderHome();
    const playing = video();
    try {
      await i18n.changeLanguage("zh");
      await vi.waitFor(() =>
        expect(video().getAttribute("src")).toMatch(
          /Film-zh-landscape-1080p\.mp4$/,
        ),
      );
      // a fresh element starts paused at 0 instead of continuing playback
      expect(video()).not.toBe(playing);
      await user.click(screen.getByRole("button", { name: "竖版 · 30 秒" }));
      expect(video().getAttribute("src")).toMatch(
        /Film-zh-portrait-1080p\.mp4$/,
      );
      expect(screen.getByRole("link", { name: "打开视频" })).toHaveAttribute(
        "href",
        expect.stringMatching(/Film-zh-portrait-1080p\.mp4$/),
      );
    } finally {
      await i18n.changeLanguage("en");
    }
  });
});
