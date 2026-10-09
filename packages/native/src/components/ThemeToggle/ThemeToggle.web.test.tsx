import { fireEvent, render, screen } from "@testing-library/react";
import { Text } from "react-native";
import { describe, expect, it } from "vitest";
import { MinervaProvider, useTheme } from "../../theme/MinervaProvider";
import { PaletteToggle, PresetToggle, ThemeToggle } from "./ThemeToggle";

function Probe() {
  const { mode, palette, design } = useTheme();
  return <Text testID="probe">{`${mode}|${palette}|${design.preset}`}</Text>;
}

describe("ThemeToggle (react-native-web)", () => {
  it("renders a labelled radio group and switches the mode", () => {
    render(
      <MinervaProvider theme="light">
        <ThemeToggle />
        <Probe />
      </MinervaProvider>,
    );
    const group = screen.getByRole("radiogroup", {
      name: "Current theme Light",
    });
    expect(group).toHaveAttribute("data-minerva", "theme-toggle");
    expect(screen.getByRole("radio", { name: "Light" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(screen.getByRole("radio", { name: "Dark" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("probe")).toHaveTextContent(/^dark\|/);
  });

  it("palette and preset toggles drive the theme", () => {
    render(
      <MinervaProvider theme="light">
        <PaletteToggle />
        <PresetToggle />
        <Probe />
      </MinervaProvider>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Graphite" }));
    expect(screen.getByTestId("probe")).toHaveTextContent(
      "light|graphite|touch",
    );
    fireEvent.click(screen.getByRole("radio", { name: "Compact" }));
    expect(screen.getByTestId("probe")).toHaveTextContent(/\|compact$/);
    expect(screen.getByRole("radio", { name: "Compact" })).toHaveAttribute(
      "data-checked",
      "",
    );
  });
});
