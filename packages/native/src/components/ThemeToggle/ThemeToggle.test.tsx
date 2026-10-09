import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { MinervaProvider, useTheme } from "../../theme/MinervaProvider";
import { getByRoleDeep } from "../../../test/queries";
import { PaletteToggle, PresetToggle, ThemeToggle } from "./ThemeToggle";

/** Reads the theme of the closest provider */
function Probe() {
  const { themeMode, mode, palette, design, colors } = useTheme();
  return (
    <>
      <Text testID="mode">{`${themeMode}/${mode}`}</Text>
      <Text testID="palette">{String(palette)}</Text>
      <Text testID="preset">{design.preset}</Text>
      <Text testID="bg">{colors["background-color"]}</Text>
      <Text testID="primary">{colors["primary-color"]}</Text>
      <Text testID="radius">{String(design.radius)}</Text>
    </>
  );
}
const text = (id: string) => String(screen.getByTestId(id).props.children);

describe("ThemeToggle", () => {
  it("switches the color mode; tokens follow", async () => {
    const onChange = vi.fn();
    const onThemeChange = vi.fn();
    const user = userEvent.setup();
    await render(
      <MinervaProvider theme="light" onThemeChange={onThemeChange}>
        <ThemeToggle onChange={onChange} />
        <Probe />
      </MinervaProvider>,
    );
    expect(
      getByRoleDeep("radiogroup", { name: "Current theme Light" }),
    ).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Light" })).toBeChecked();
    const lightBg = text("bg");
    await user.press(screen.getByRole("radio", { name: "Dark" }));
    expect(onChange).toHaveBeenCalledWith("dark");
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    expect(text("mode")).toBe("dark/dark");
    expect(text("bg")).not.toBe(lightBg);
    expect(text("bg")).toBe(
      resolveTokens({ mode: "dark", design: { preset: "touch" } }).colors[
        "background-color"
      ],
    );
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(
      getByRoleDeep("radiogroup", { name: "Current theme Dark" }),
    ).toBeTruthy();
    await user.press(screen.getByRole("radio", { name: "System" }));
    expect(text("mode")).toMatch(/^system\//);
  });

  it("hides the system option, localizes and overrides labels", async () => {
    await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <ThemeToggle showSystem={false} labels={{ light: "Day" }} />
      </MinervaProvider>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByRole("radio", { name: "Day" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "暗" })).toBeChecked();
    expect(getByRoleDeep("radiogroup", { name: "当前主题 暗" })).toBeTruthy();
  });

  it("disabled ignores presses; segments reach 44pt", async () => {
    await render(
      <MinervaProvider theme="light">
        <ThemeToggle disabled />
        <Probe />
      </MinervaProvider>,
    );
    const dark = screen.getByRole("radio", { name: "Dark" });
    expect(dark).toBeDisabled();
    expect(dark.props.hitSlop).toEqual({
      top: 4,
      bottom: 4,
      left: 0,
      right: 0,
    });
    await fireEvent.press(dark);
    expect(text("mode")).toBe("light/light");
  });
});

describe("PaletteToggle", () => {
  it("switches the palette; the primary color follows", async () => {
    const onChange = vi.fn();
    await render(
      <MinervaProvider theme="light" preset="minerva">
        <PaletteToggle showDefault onChange={onChange} />
        <Probe />
      </MinervaProvider>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    expect(screen.getByRole("radio", { name: "Default" })).toBeChecked();
    expect(
      getByRoleDeep("radiogroup", { name: "Current palette Default" }),
    ).toBeTruthy();
    const before = text("primary");
    await fireEvent.press(screen.getByRole("radio", { name: "Tech" }));
    expect(onChange).toHaveBeenCalledWith("tech");
    expect(text("palette")).toBe("tech");
    expect(text("primary")).not.toBe(before);
    expect(screen.getByRole("radio", { name: "Tech" })).toBeChecked();
    await fireEvent.press(screen.getByRole("radio", { name: "Default" }));
    expect(text("palette")).toBe("null");
    expect(text("primary")).toBe(before);
  });

  it("offers the given palettes, localized", async () => {
    await render(
      <MinervaProvider locale={{ language: "fr" }} palette="cool">
        <PaletteToggle palettes={["graphite", "cool"]} />
      </MinervaProvider>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByRole("radio", { name: /graphite/i })).not.toBeChecked();
    const cool = screen
      .getAllByRole("radio")
      .find((r) => r.props.accessibilityState.checked);
    expect(cool).toBeTruthy();
  });
});

describe("PresetToggle", () => {
  it("switches the design preset; design tokens follow", async () => {
    const onChange = vi.fn();
    await render(
      <MinervaProvider theme="light">
        <PresetToggle onChange={onChange} />
        <Probe />
      </MinervaProvider>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByRole("radio", { name: "Touch" })).toBeChecked();
    expect(
      getByRoleDeep("radiogroup", { name: "Current preset Touch" }),
    ).toBeTruthy();
    const radius = text("radius");
    await fireEvent.press(screen.getByRole("radio", { name: "Compact" }));
    expect(onChange).toHaveBeenCalledWith("compact");
    expect(text("preset")).toBe("compact");
    expect(text("radius")).not.toBe(radius);
    await fireEvent.press(screen.getByRole("radio", { name: "Editorial" }));
    expect(text("preset")).toBe("editorial");
    expect(text("palette")).toBe("editorial");
  });
});
