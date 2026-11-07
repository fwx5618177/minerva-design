// @vitest-environment happy-dom
// Landing page: the framework guides grouped by renderer, the live
// component playground (real Minerva components, driven with user-event).
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import i18n from "@i18n/config";
import { LATEST_VERSION } from "@/docs/releases";
import HomePage from "./HomePage";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const renderHome = () =>
  render(
    <SiteProviders>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </SiteProviders>,
  );

const panel = () =>
  screen.getByRole("region", {
    name: "Component playground",
  });

describe("home page", () => {
  it("distinguishes native renderers from Web Components adapters", () => {
    renderHome();
    const group = screen.getByRole("group", { name: "Supported frameworks" });
    expect(group).toHaveTextContent(/^Native:/);
    expect(within(group).getByText("Web Components:")).toBeInTheDocument();
    const items = within(group).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([
      "React",
      "Vue",
      "React Native",
      "Angular",
      "Taro",
      "uni-app",
      "WeChat",
      "Svelte",
      "Solid",
      "HTML",
    ]);
    for (const item of items) {
      expect(item.querySelector("a")).toHaveAttribute(
        "data-minerva",
        "text-link",
      );
    }
    expect(screen.queryByText("React + Web Components")).toBeNull();
  });

  it("keeps the hero free of framework pills and links the support matrix", () => {
    renderHome();
    const hero = document.querySelector(
      'section[aria-labelledby="home-title"]',
    )!;
    expect(hero.querySelector("[data-framework-icon]")).toBeNull();
    expect(
      screen.getByRole("link", { name: "support matrix" }),
    ).toHaveAttribute("href", "/platform-support");
  });

  it("uses library links for the hero navigation without nesting buttons", () => {
    renderHome();
    for (const href of ["/installation", "/button"]) {
      const link = document.querySelector(
        `#home-title ~ div a[href="${href}"]`,
      );
      expect(link).toHaveAttribute("data-minerva", "text-link");
      expect(link?.querySelector("button")).toBeNull();
    }
  });

  it("links the newest version to the changelog", () => {
    renderHome();
    const link = screen.getByRole("link", {
      name: `v${LATEST_VERSION} Changelog`,
    });
    expect(link).toHaveAttribute("href", "/changelog");
  });

  it("translates the label but not the framework names", async () => {
    await i18n.changeLanguage("fr");
    try {
      renderHome();
      const group = screen.getByRole("group", {
        name: "Frameworks pris en charge",
      });
      expect(within(group).getByText("Web Components :")).toBeInTheDocument();
      expect(within(group).getByText("Angular")).toBeInTheDocument();
    } finally {
      await i18n.changeLanguage("en");
    }
  });

  it("updates scoped design tokens and displays real component interactions", async () => {
    const user = userEvent.setup();
    renderHome();
    const view = within(panel());
    const preview = view.getByTestId("playground-preview");
    const scope = preview.closest("[data-minerva-theme-scope]")!;
    const rootTheme = document.documentElement.getAttribute("data-theme");
    await user.click(view.getByRole("switch", { name: "Dark preview" }));
    expect(scope).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe(rootTheme);
    await user.click(view.getByRole("combobox", { name: "Palette" }));
    await user.click(screen.getByRole("option", { name: "Graphite" }));
    expect(scope).toHaveAttribute("data-palette", "graphite");
    await user.click(view.getByRole("combobox", { name: "Corners" }));
    await user.click(screen.getByRole("option", { name: "Square" }));
    expect(scope).toHaveAttribute("data-radius", "none");
    await user.click(view.getByRole("button", { name: "Try button" }));
    expect(within(preview).getByRole("status")).toHaveTextContent("Clicks: 1");
    await user.click(view.getByRole("switch", { name: "Disable button" }));
    expect(view.getByRole("button", { name: "Try button" })).toBeDisabled();
    await user.click(view.getByRole("button", { name: "View example source" }));
    expect(view.getByRole("region", { name: "TSX code" })).toHaveTextContent(
      'palette="graphite"',
    );
    expect(view.getByRole("region", { name: "TSX code" })).toHaveTextContent(
      'radius="none"',
    );
  });
});

it("uses the shared highlighted code block and library copy control", async () => {
  const { container } = renderHome();
  expect(
    await screen.findByRole("region", { name: "Terminal code" }),
  ).toHaveTextContent("pnpm add minerva-design");
  expect(screen.getByRole("button", { name: "Copy code" })).toHaveAttribute(
    "data-minerva",
    "button",
  );
  await vi.waitFor(() =>
    expect(container.querySelector("code .token")).not.toBeNull(),
  );
});

it("switches the film with the site language and selected format", async () => {
  const user = userEvent.setup();
  const { container } = renderHome();
  const video = () => container.querySelector("video")!;
  expect(video()).not.toBeNull();
  expect(video().getAttribute("src")).toContain("Film-en-landscape-1080p.mp4");
  expect(video()).toHaveAttribute("preload", "none");
  expect(video()).not.toHaveAttribute("autoplay");
  await user.click(screen.getByRole("radio", { name: "Portrait · 30s" }));
  expect(video().getAttribute("src")).toContain("Film-en-portrait-1080p.mp4");
  try {
    await i18n.changeLanguage("zh");
    await vi.waitFor(() =>
      expect(video().getAttribute("src")).toContain(
        "Film-zh-portrait-1080p.mp4",
      ),
    );
    expect(video().querySelector("track")).toHaveAttribute(
      "src",
      expect.stringContaining("captions-zh.vtt"),
    );
    // no caption bar under the film
    expect(screen.queryByText(/配乐/)).toBeNull();
    expect(video().getAttribute("poster")).toContain(
      "Film-zh-portrait-poster.jpg",
    );
    await i18n.changeLanguage("fr");
    await vi.waitFor(() =>
      expect(video().getAttribute("src")).toContain(
        "Film-en-portrait-1080p.mp4",
      ),
    );
  } finally {
    await i18n.changeLanguage("en");
  }
});
