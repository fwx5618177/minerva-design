// ThemeToggle and PaletteToggle (English is lib-core's default language; the
// Chinese labels are covered by the zh locale tests below).
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../contexts/ThemeProvider";
import i18n from "../../config/i18n";
import type { ThemeMode } from "../../theme-utils";
import { PaletteToggle, ThemeToggle, type ThemeToggleProps } from ".";

const root = document.documentElement;

afterEach(() => {
  document.cookie = "theme=; max-age=0; path=/";
  document.cookie = "palette=; max-age=0; path=/";
  vi.restoreAllMocks();
  root.removeAttribute("style");
  delete root.dataset.theme;
  delete root.dataset.palette;
  act(() => {
    i18n.changeLanguage("en");
  });
});

function renderToggle(
  props: ThemeToggleProps = {},
  defaultTheme: ThemeMode = "light",
  disableStorage = true,
) {
  return render(
    <ThemeProvider defaultTheme={defaultTheme} disableStorage={disableStorage}>
      <ThemeToggle data-testid="toggle" {...props} />
    </ThemeProvider>,
  );
}

const activeLabels = () =>
  screen
    .getAllByRole("button")
    .filter((button) => button.hasAttribute("data-active"))
    .map((button) => button.textContent);

describe("ThemeToggle", () => {
  it("renders light / dark / system buttons with default labels", () => {
    renderToggle();
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual([
      "Light",
      "Dark",
      "System",
    ]);
    for (const button of buttons)
      expect(button).toHaveAttribute("type", "button");
  });

  it("hides the system option when showSystem is false", () => {
    renderToggle({ showSystem: false });
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Light",
      "Dark",
    ]);
  });

  it("merges partial custom labels with defaults", () => {
    renderToggle({ labels: { dark: "Night" } });
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Light",
      "Night",
      "System",
    ]);
  });

  it("marks only the selected theme active and labels the group with the resolved theme", () => {
    renderToggle({}, "dark");
    expect(activeLabels()).toEqual(["Dark"]);
    expect(screen.getByTestId("toggle")).toHaveAttribute(
      "aria-label",
      "Current theme dark",
    );
  });

  it("switches theme on click and updates documentElement", async () => {
    const user = userEvent.setup();
    renderToggle();
    expect(root.dataset.theme).toBe("light");
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(activeLabels()).toEqual(["Dark"]);
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
    expect(screen.getByTestId("toggle")).toHaveAttribute(
      "aria-label",
      "Current theme dark",
    );
  });

  it("marks system active while reporting the resolved system theme", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: query === "(prefers-color-scheme: dark)",
          media: query,
          onchange: null,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
          addListener: () => undefined,
          removeListener: () => undefined,
          dispatchEvent: () => true,
        }) as unknown as MediaQueryList,
    );
    renderToggle();
    await user.click(screen.getByRole("button", { name: "System" }));
    expect(activeLabels()).toEqual(["System"]);
    expect(screen.getByTestId("toggle")).toHaveAttribute(
      "aria-label",
      "Current theme dark",
    );
    expect(root.dataset.theme).toBe("dark");
  });

  it("persists the selected theme to the cookie when storage is enabled", async () => {
    const user = userEvent.setup();
    renderToggle({}, "light", false);
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(document.cookie).toContain("theme=dark");
  });

  it("is keyboard operable", async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Dark" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(root.dataset.theme).toBe("dark");
  });

  it("forwards className, ref and native attributes to the wrapper", () => {
    const ref = { current: null as HTMLDivElement | null };
    renderToggle({ className: "consumer", id: "mode", ref });
    const wrapper = screen.getByTestId("toggle");
    expect(wrapper).toHaveClass("group", "consumer");
    expect(wrapper).toHaveAttribute("id", "mode");
    expect(wrapper).not.toHaveAttribute("showsystem");
    expect(ref.current).toBe(wrapper);
  });

  it("throws when rendered outside a provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<ThemeToggle />)).toThrow(/ThemeProvider/);
  });

  it("is a group of toggle buttons exposing the selection via aria-pressed", async () => {
    const user = userEvent.setup();
    renderToggle();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("uses the Chinese labels with the zh locale", async () => {
    render(
      <ThemeProvider
        defaultTheme="dark"
        disableStorage
        locale={{ language: "zh" }}
      >
        <ThemeToggle data-testid="toggle" />
      </ThemeProvider>,
    );
    expect(
      (await screen.findAllByRole("button")).map((b) => b.textContent),
    ).toEqual(["亮", "暗", "跟随"]);
    expect(screen.getByTestId("toggle")).toHaveAttribute(
      "aria-label",
      "当前主题 dark",
    );
  });
});

describe("PaletteToggle", () => {
  it("renders only the palettes requested by the consumer and updates the document palette", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultPalette="graphite" disableStorage>
        <PaletteToggle
          palettes={["graphite", "cool"]}
          labels={{ graphite: "石墨灰", cool: "冷灰蓝" }}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "石墨灰",
      "冷灰蓝",
    ]);
    await user.click(screen.getByRole("button", { name: "冷灰蓝" }));
    expect(root.dataset.palette).toBe("cool");
  });

  it("offers every palette by default, merging partial labels", () => {
    render(
      <ThemeProvider defaultPalette="editorial" disableStorage>
        <PaletteToggle
          data-testid="palette"
          className="consumer"
          labels={{ tech: "Technology" }}
        />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Editorial",
      "Technology",
      "Graphite",
      "Cool",
    ]);
    expect(screen.getByTestId("palette")).toHaveClass("group", "consumer");
  });

  it("marks the active palette and reflects it in the group label", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultPalette="editorial" disableStorage>
        <PaletteToggle data-testid="palette" palettes={["editorial", "tech"]} />
      </ThemeProvider>,
    );
    const wrapper = screen.getByTestId("palette");
    expect(wrapper).toHaveAttribute("aria-label", "Current palette editorial");
    expect(screen.getByRole("button", { name: "Editorial" })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(screen.getByRole("button", { name: "Tech" })).not.toHaveAttribute(
      "data-active",
    );
    await user.click(screen.getByRole("button", { name: "Tech" }));
    expect(wrapper).toHaveAttribute("aria-label", "Current palette tech");
    expect(screen.getByRole("button", { name: "Tech" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Editorial" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(root.dataset.palette).toBe("tech");
  });

  it("persists the palette cookie when storage is enabled", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultPalette="editorial">
        <PaletteToggle />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Tech" }));
    expect(document.cookie).toContain("palette=tech");
  });

  it("can offer Minerva's default look (no palette)", async () => {
    const user = userEvent.setup();
    const ref = { current: null as HTMLDivElement | null };
    render(
      <ThemeProvider defaultPalette="cool" disableStorage>
        <PaletteToggle showDefault palettes={["cool"]} ref={ref} />
      </ThemeProvider>,
    );
    const group = screen.getByRole("group");
    expect(ref.current).toBe(group);
    await user.click(within(group).getByRole("button", { name: "Default" }));
    expect(root.dataset.palette).toBeUndefined();
    expect(group).toHaveAttribute("aria-label", "Current palette Default");
    expect(
      within(group).getByRole("button", { name: "Default" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("uses the Chinese labels with the zh locale", async () => {
    render(
      <ThemeProvider
        defaultPalette="editorial"
        disableStorage
        locale={{ language: "zh" }}
      >
        <PaletteToggle palettes={["editorial", "tech"]} />
      </ThemeProvider>,
    );
    const group = await screen.findByRole("group");
    expect(
      within(group)
        .getAllByRole("button")
        .map((b) => b.textContent),
    ).toEqual(["文学", "科技"]);
    expect(group).toHaveAttribute("aria-label", "当前色身 editorial");
  });
});
