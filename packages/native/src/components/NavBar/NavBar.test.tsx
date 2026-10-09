import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";
import { resolveTokens } from "@minerva/core";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("renders a toolbar named by its header title", async () => {
    await render(<NavBar title="Settings" />);
    expect(getByRoleDeep("toolbar", { name: "Settings" })).toBeTruthy();
    expect(screen.getByRole("header", { name: "Settings" })).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("back arrow: labelled by navBar.back, calls onBack", async () => {
    const onBack = vi.fn();
    await render(<NavBar title="T" leftArrow onBack={onBack} />);
    const back = screen.getByRole("button", { name: "Back" });
    await fireEvent.press(back);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("leftText names the back button; backLabel overrides", async () => {
    const { rerender } = await render(<NavBar leftArrow leftText="Home" />);
    expect(screen.getByRole("button", { name: "Home" })).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    await rerender(<NavBar leftArrow leftText="Home" backLabel="Go home" />);
    expect(screen.getByRole("button", { name: "Go home" })).toBeTruthy();
  });

  it("right text button and custom nodes", async () => {
    const onPressRight = vi.fn();
    const { rerender } = await render(
      <NavBar title="T" rightText="Edit" onPressRight={onPressRight} />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Edit" }));
    expect(onPressRight).toHaveBeenCalledTimes(1);
    await rerender(
      <NavBar
        title={<Text>Custom</Text>}
        left={<Text>L</Text>}
        right={<Text>R</Text>}
        leftArrow
      />,
    );
    expect(screen.getByText("Custom")).toBeTruthy();
    expect(screen.getByText("L")).toBeTruthy();
    expect(screen.getByText("R")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("translates the back label", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <NavBar leftArrow />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "返回" })).toBeTruthy();
  });

  it("pads the top safe-area inset unless disabled, hairline border", async () => {
    const { rerender } = await render(
      <MinervaProvider insets={{ top: 47 }}>
        <NavBar title="T" testID="bar" />
      </MinervaProvider>,
    );
    expect(screen.getByTestId("bar")).toHaveStyle({
      paddingTop: 47,
      borderBottomWidth: StyleSheet.hairlineWidth,
    });
    await rerender(
      <MinervaProvider insets={{ top: 47 }}>
        <NavBar
          title="T"
          testID="bar"
          safeAreaInsetTop={false}
          border={false}
        />
      </MinervaProvider>,
    );
    expect(screen.getByTestId("bar")).toHaveStyle({
      paddingTop: 0,
      borderBottomWidth: 0,
    });
  });

  it("uses the surface token, dark mode too", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    await render(
      <MinervaProvider theme="dark">
        <NavBar title="T" testID="bar" leftArrow />
      </MinervaProvider>,
    );
    expect(screen.getByTestId("bar")).toHaveStyle({
      backgroundColor: dark.colors["surface-color"],
    });
    // 36pt button: grown to the 44pt touch target
    expect(queryPart("back", "nav-bar")?.props.hitSlop).toEqual({
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    });
  });
});
